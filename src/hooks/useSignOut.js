import { useApolloClient } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';
import { useNavigate } from 'react-router-native';

const useSignOut = () => {
  const authStorage = useAuthStorage();
  // use apolloClient to use resetStore() method & remove all AsyncStorage cache data from previous login on the users device
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const signOut = () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate('/');
  };

  return { signOut };
};

export default useSignOut;
