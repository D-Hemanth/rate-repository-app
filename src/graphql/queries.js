import { gql } from '@apollo/client';

// gql query for getting all the repositories data from apollo server backend
export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          fullName
          ratingAverage
          reviewCount
          stargazersCount
          forksCount
          ownerAvatarUrl
          description
          language
        }
      }
    }
  }
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
