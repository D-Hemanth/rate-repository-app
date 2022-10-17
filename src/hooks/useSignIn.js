import { useApolloClient, useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  // use apolloClient to use resetStore() method & remove all AsyncStorage data on the users device
  const apolloClient = useApolloClient();

  // useSignIn hook that sends the authenticate mutation using the useMutation hook
  const [mutate, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments which gives output { data, loading, error }
    // use mutate function query from useMutation for logging in a user who's data is already in gql server
    const { data } = await mutate({ variables: { username, password } });
    await authStorage.setAccessToken(data.authenticate.accessToken);
    apolloClient.resetStore();

    // console.log('Logged in user accessToken', data);
    return data;
  };

  return [signIn, result];
};

export default useSignIn;
