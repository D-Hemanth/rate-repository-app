import { gql } from '@apollo/client';

// gql mutation for logging in a user & getting access token from apollo server backend
// 3 things to remember for gql variables: query should be named, Declare $variableName as one of the variables accepted by the query & pass it as a parameter to query
// the authenticate mutation has a single argument called credentials, which is of type AuthenticateInput. This input type contains username and password fields.
export const LOGIN = gql`
  mutation authenticate($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;
