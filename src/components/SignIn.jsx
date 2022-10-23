import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import { Formik } from 'formik';
import { View, StyleSheet } from 'react-native';
import Button from './Button';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import theme from '../theme';
import Text from './Text';

const initialValues = {
  username: '',
  password: '',
};

const styles = StyleSheet.create({
  button: {
    margin: 15,
    backgroundColor: theme.button.backgroundPinkColor,
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Username must be greater than or equal to 5 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(8, 'Password must be greater than or equal to 8 characters')
    .required('Password is required'),
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <Button onPress={onSubmit} style={styles.button}>
        <Text fontSize="subheading" fontWeight="bold">
          Sign In
        </Text>
      </Button>
    </View>
  );
};

// export SignInFormContainer having only the pure code without graphql query so that we can use it in testing
export const SignInFormContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignIn = () => {
  // call the useSignIn component with useMutation to get the logged in user's accessToken
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      // use the signIn mutation function to perform the user login authentication with useMutation which gives output { data, loading, error }
      await signIn({ username, password });

      // on successful login redirect user to repositories homepage
      navigate('/', { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return <SignInFormContainer onSubmit={onSubmit} />;
};

export default SignIn;
