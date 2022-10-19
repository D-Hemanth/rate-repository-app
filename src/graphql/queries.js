import { gql } from '@apollo/client';

// gql query for getting all the repositories data from apollo server backend
export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
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

// gql repository query to get the url field of the Repository type, the query has a single argument, which is the id of the repository
export const URL = gql`
  query repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      fullName
      ratingAverage
      reviewCount
      stargazersCount
      forksCount
      ownerAvatarUrl
      description
      language
      url
    }
  }
`;
