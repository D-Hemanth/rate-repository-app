import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// HTTP connection to the GraphQL server
const httpLink = createHttpLink({
  // Replace the IP address part with your own IP address!
  // URL used to connect to the Apollo Server is otherwise the same as the one you used with the Fetch API expect the port is 4000 and the path is /graphql
  uri: 'http://192.168.1.8:4000/graphql',
});

// create a new client object using ApolloClient, which is then used to send a query to the server
// The link parameter given to the client object defines how apollo connects to the gql server.
const createApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
