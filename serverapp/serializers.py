from rest_framework import serializers

class RepoOwnerSerializer(serializers.Serializer):
    login = serializers.CharField()
    avatar_url = serializers.CharField()
    
class RepoSummarySerializer(serializers.Serializer):
    id = serializers.IntegerField()
    full_name = serializers.CharField()
    description = serializers.CharField(allow_null=True)
    language = serializers.CharField(allow_null=True)
    stargazers_count = serializers.IntegerField()
    forks_count = serializers.IntegerField()
    html_url = serializers.URLField()
    owner = RepoOwnerSerializer()
    
class RepoDetailSerializer(RepoSummarySerializer):
       open_issues_count =serializers.IntegerField()
       subscribers_count = serializers.IntegerField()
       created_at =serializers.DateTimeField()
       updated_at = serializers.DateTimeField()
       readme_html =serializers.CharField(allow_blank=True, allow_null=True)