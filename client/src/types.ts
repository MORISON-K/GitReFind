export interface Repo {
  id: number;
  full_name: string;
  description: string;
  stargazers_count: number;
  language: string;
  html_url: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface RepoDetails extends Repo {
  forks_count: number;
  open_issues_count: number;
  subscribers_count: number;
  created_at: string;
  updated_at: string;
  readme_html?: string;
}
