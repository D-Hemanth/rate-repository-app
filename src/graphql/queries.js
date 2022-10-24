import { gql } from '@apollo/client';
import { REPOSITORY_DETAILS, REVIEW_DETAILS } from './fragments';

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
// conditionally check if includeReviews variable is set to true/false to decide whether to include reviews or not using GraphQL's include directive
// The includeReviews argument has a default value of false, because we don't want to cause additional server overhead unless we explicitly want to fetch authenticated user's reviews.
export const GET_CURRENT_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        totalCount
        edges {
          node {
            ...ReviewDetails
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
  ${REVIEW_DETAILS}
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
            ...ReviewDetails
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
  ${REVIEW_DETAILS}
`;
