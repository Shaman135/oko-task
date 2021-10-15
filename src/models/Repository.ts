export interface Repository {
  databaseId: number;
  name: string;
  homepageUrl: string;
  description: string;
  stargazers: { totalCount: number },
  forks: { totalCount: number}
  updatedAt: string;
}