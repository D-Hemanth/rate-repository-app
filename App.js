import { NativeRouter } from 'react-router-native';
import Main from './src/components/Main';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';

const authStorage = new AuthStorage();
// We also provided the storage instance for the createApolloClient function as an argument because next, we will send the access token to Apollo Server in each request
const apolloClient = createApolloClient(authStorage);

// apollo client can be made accessible for all components of the application by wrapping the Main app component inside ApolloProvider
// React Context i.e. AuthStorageContext is just the method we need for sending the authorization token with each apollo client request
const App = () => {
  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value={authStorage}>
            <Main />
          </AuthStorageContext.Provider>
        </ApolloProvider>
      </NativeRouter>
    </>
  );
};

export default App;
