import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/mutations';

const useSignIn = () => {
  // useSignIn hook that sends the authenticate mutation using the useMutation hook
  const [mutate, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments which gives output { data, loading, error }
    // use mutate function query from useMutation for logging in a user who's data is already in gql server
    return await mutate({ variables: { username, password } });
  };

  return [signIn, result];
};

export default useSignIn;
