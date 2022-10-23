import { useMutation } from '@apollo/client';
import { SIGN_UP_USER } from '../graphql/mutations';

const useSignUp = () => {
  const [mutate, result] = useMutation(SIGN_UP_USER, {
    onError: (error) => {
      console.log(error.message);
    },
  });

  const signUp = async ({ username, password }) => {
    // call the mutate function here with the right arguments which gives output { data, loading, error }
    // use mutate function query from useMutation for creating a new user who's data is not already in gql server
    const { data } = await mutate({ variables: { username, password } });
    // console.log('data', data);

    if (data) {
      return data.createUser.username;
    }
  };

  return [signUp, result];
};

export default useSignUp;
