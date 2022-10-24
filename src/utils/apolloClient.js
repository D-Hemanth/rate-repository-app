import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants';
import { setContext } from '@apollo/client/link/context';
import { relayStylePagination } from '@apollo/client/utilities';

// You might need to change this depending on how you have configured the Apollo Server's URI
const { apollo_uri } = Constants.manifest.extra;

// HTTP connection to the GraphQL server
const httpLink = createHttpLink({
  uri: apollo_uri,
});

// add fetchMore policies to the InMemoryCache for repositories field & review field
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        repositories: relayStylePagination(),
      },
    },
    Repository: {
      fields: {
        reviews: relayStylePagination(),
      },
    },
  },
});

// create a new client object using ApolloClient, which is then used to send a query to the server
// The link parameter given to the client object defines how apollo connects to the gql server.
const createApolloClient = (authStorage) => {
  // we will send the access token to Apollo Server in each request in the Authorization header
  // in the format Bearer <ACCESS_TOKEN> by using the setContext function
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    } catch (error) {
      console.log(error);
      return {
        headers,
      };
    }
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
  });
};

export default createApolloClient;
