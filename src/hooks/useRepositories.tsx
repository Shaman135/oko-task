import { request, gql } from "graphql-request";
import { useInfiniteQuery } from "react-query";
import { apiToken, apiUrl } from "../constants";

const useRepositoriesSearch = (query: string) => {
  const fetchRepositories = async (
    query: string,
    pageParam: string | undefined
  ) => {
    const { search } = await request(
      apiUrl,
      gql`
        query ($query: String!, $cursor: String) {
          search(query: $query, type: REPOSITORY, first: 10, after: $cursor) {
            repositoryCount
            pageInfo {
              endCursor
              hasNextPage
            }
            edges {
              node {
                ... on Repository {
                  databaseId
                  name
                  homepageUrl
                  description
                  stargazers {
                    totalCount
                  }
                  forks {
                    totalCount
                  }
                  updatedAt
                }
              }
            }
          }
        }
      `,
      {
        query,
        cursor: pageParam,
      },
      {
        Authorization: `Bearer ${apiToken}`,
      }
    );
    return search;
  };

  return useInfiniteQuery(
    "repositories",
    (pageParam) => fetchRepositories(query, pageParam.pageParam),
    {
      enabled: false,
      getNextPageParam: (lastPage, _) =>
        lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : undefined,
    }
  );
};

export default useRepositoriesSearch;
