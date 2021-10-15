import { Repository } from "./Repository";

export interface Edge {
  node: Repository;
}

export interface Response {
  repositoryCount: number;
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
  };
  edges: Edge[];
}