from django.urls import path
from .views import SearchView, RepoDetailView

urlpatterns = [
    path('search/', SearchView.as_view(), name='search'),
    path('repos/<str:owner>/<str:repo>', RepoDetailView.as_view, name='repo_details')
]