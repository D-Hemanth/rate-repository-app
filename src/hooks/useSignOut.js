import { useApolloClient } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';

const useSignOut = () => {
  const authStorage = useAuthStorage();
  // use apolloClient to use resetStore() method & remove all AsyncStorage cache data from previous login on the users device
  const apolloClient = useApolloClient();

  const signOut = () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  // return the signOut method function to use when required in th Appbar component
  return [signOut];
};

export default useSignOut;
