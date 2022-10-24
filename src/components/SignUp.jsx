import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import { Formik } from 'formik';
import { View, StyleSheet } from 'react-native';
import Button from './Button';
import useSignIn from '../hooks/useSignIn';
import useSignUp from '../hooks/useSignUp';
import { useNavigate } from 'react-router-native';
import theme from '../theme';
import Text from './Text';

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

const styles = StyleSheet.create({
  button: {
    margin: 15,
    backgroundColor: theme.button.backgroundPinkColor,
  },
  buttonText: {
    color: 'white',
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Username must be greater than or equal to 1 characters')
    .max(30, 'Username must be lesser than or equal to 30 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be greater than or equal to 5 characters')
    .max(50, 'Password must be lesser than or equal to 50 characters')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null])
    .required('Password confirmation is required'),
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <FormikTextInput
        name="passwordConfirmation"
        placeholder="Password confirmation"
        secureTextEntry
      />
      <Button onPress={onSubmit} style={styles.button}>
        <Text fontSize="subheading" fontWeight="bold" style={styles.buttonText}>
          Sign Up
        </Text>
      </Button>
    </View>
  );
};

const SignUp = () => {
  const [signIn] = useSignIn();
  const [signUp] = useSignUp();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      // if the user is successful in creating a new account with signup then log them in.
      const signedUp = await signUp({ username, password });

      if (signedUp) {
        // use the signIn mutation function to perform the user login authentication with useMutation which gives output { data, loading, error }
        await signIn({ username, password });

        // on successful login redirect user to repositories homepage
        navigate('/', { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;
