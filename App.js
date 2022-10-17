import { NativeRouter } from 'react-router-native';
import Main from './src/components/Main';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './src/utils/apolloClient';
import Constants from 'expo-constants';

const apolloClient = createApolloClient();

// apollo client can be made accessible for all components of the application by wrapping the Main app component inside ApolloProvider
const App = () => {
  // console.log(
  //   'expo config from constants including the env variables',
  //   Constants.manifest.extra.apollo_uri
  // );

  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <Main />
        </ApolloProvider>
      </NativeRouter>
    </>
  );
};

export default App;
