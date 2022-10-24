import { gql } from '@apollo/client';
import { REPOSITORY_DETAILS } from './fragments';

// gql query for getting all the repositories data from apollo server backend with arguments to get all the repositories orderBy date & orderdirection from ASC to DESC, first, after to limit the total repos returned by 1 request for infinite scrolling
export const GET_REPOSITORIES = gql`
  query Repositories(
    $orderDirection: OrderDirection
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      totalCount
      edges {
        node {
          ...RepositoryDetails
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
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

// gql repository query to get the url field of the Repository type, the query has a single argument, which is the id of the repository & the reviews field of the repository takes the args first, after to limit the reviews shown by 1 request for infinite scrolling
export const SINGLE_REPOSITORY = gql`
  query repository($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      ...RepositoryDetails
      reviews(first: $first, after: $after) {
        totalCount
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
`;
