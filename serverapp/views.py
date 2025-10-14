import os
import requests
import markdown
import base64
from django.core.cache import cache
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import RepoSummarySerializer, RepoDetailSerializer

GITHUB_API_URL = "https://api.github.com"
GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN")

def get_github_headers():
    headers = {"Accept": "application/vnd.github.v3+json"}
    if GITHUB_TOKEN:
        headers["Authorization"] = f"token {GITHUB_TOKEN}"
    return headers

class SearchView(APIView):
    def get(self, request):
        query = request.query_params.get('q')
        if not query:
            return Response({"error": "Query parameter 'q' is required."}, status=400)

        cache_key = f"github_search_v2_name_desc_{query}"
        cached_results = cache.get(cache_key)
        if cached_results:
            return Response(cached_results)

        try:
            # Search query to look in name and description
            search_query = f"{query} in:name,description"
            response = requests.get(
                f"{GITHUB_API_URL}/search/repositories",
                params={'q': search_query},
                headers=get_github_headers()
            )
            response.raise_for_status()
            data = response.json()
            serializer = RepoSummarySerializer(data['items'], many=True)
            response_data = {
                'total_count': data['total_count'],
                'items': serializer.data
            }
            cache.set(cache_key, response_data, timeout=3600)  # Cache for 1 hour
            return Response(response_data)
        except requests.exceptions.RequestException as e:
            return Response({"error": str(e)}, status=500)

class RepoDetailView(APIView):
    def get(self, request, owner, repo):
        cache_key = f"github_repo_{owner}_{repo}"
        cached_details = cache.get(cache_key)
        if cached_details:
            return Response(cached_details)

        try:
            repo_response = requests.get(
                f"{GITHUB_API_URL}/repos/{owner}/{repo}",
                headers=get_github_headers()
            )
            repo_response.raise_for_status()
            repo_data = repo_response.json()

            readme_response = requests.get(
                f"{GITHUB_API_URL}/repos/{owner}/{repo}/readme",
                headers=get_github_headers()
            )
            if readme_response.status_code == 200:
                readme_content = readme_response.json()['content']
                decoded_readme = base64.b64decode(readme_content).decode('utf-8')
                repo_data['readme_html'] = markdown.markdown(decoded_readme)
            else:
                repo_data['readme_html'] = "<p>No README found.</p>"

            serializer = RepoDetailSerializer(repo_data)
            cache.set(cache_key, serializer.data, timeout=3600)
            return Response(serializer.data)
        except requests.exceptions.RequestException as e:
            return Response({"error": str(e)}, status=500)
