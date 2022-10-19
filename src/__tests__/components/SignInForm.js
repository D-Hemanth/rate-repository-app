import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInFormContainer } from '../../components/SignIn';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    // Note that Formik's form submissions are asynchronous so expecting the onSubmit function to be called immediately
    // after pressing the submit button won't work to solve this issue make teh test function an async function
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      // Mock functions are also known as "spies", because they let you spy on the behavior of a function that is called indirectly by some other code
      const onSubmit = jest.fn();
      const { getByPlaceholderText, debug, getByText } = render(
        <SignInFormContainer onSubmit={onSubmit} />
      );

      // The debug function prints the rendered React tree in a user-friendly format.
      debug();

      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        fireEvent.changeText(getByPlaceholderText('Username'), 'kalle');
        fireEvent.changeText(getByPlaceholderText('Password'), 'password');
        fireEvent.press(getByText('Sign In'));

        // use mock func method toHaveBeenCalledTimes to check how many times onSubmit has been called
        expect(onSubmit).toHaveBeenCalledTimes(1);

        // onSubmit.mock.calls[0][0] contains the first argument of the first call
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password',
        });
      });
    });
  });
});
