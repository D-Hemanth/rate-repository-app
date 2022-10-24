import { gql } from '@apollo/client';
import { REPOSITORY_DETAILS } from './fragments';

// gql query for getting all the repositories data from apollo server backend with arguments to get all the repositories orderBy date & orderdirection from ASC to DESC
export const GET_REPOSITORIES = gql`
  query Repositories($orderDirection: OrderDirection, $searchKeyword: String) {
    repositories(
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          ...RepositoryDetails
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
`;

// gql me query can be used to check the authenticated user's infor-mation. If the query's result is null, that means that the user is not authenticated.
export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`;

// gql repository query to get the url field of the Repository type, the query has a single argument, which is the id of the repository
export const SINGLE_REPOSITORY = gql`
  query repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...RepositoryDetails
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
`;
