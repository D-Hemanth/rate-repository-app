// Example 1

// describe('Example', () => {
//   it('works', () => {
//     expect(1).toBe(1);
//   });
// });

// Example 2

// import { Text, View } from 'react-native';
// import { render } from '@testing-library/react-native';

// const Greeting = ({ name }) => {
//   return (
//     <View>
//       <Text>Hello {name}!</Text>
//     </View>
//   );
// };

// describe('Greeting', () => {
//   it('renders a greeting message based on the name prop', () => {
//     const { debug, getByText } = render(<Greeting name="Kalle" />);

//     debug();

//     expect(getByText('Hello Kalle!')).toBeDefined();
//   });
// });

// Example 3

import { useState } from 'react';
import { Text, TextInput, Pressable, View } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';

const Form = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    onSubmit({ username, password });
  };

  return (
    <View>
      <View>
        <TextInput
          value={username}
          onChangeText={(text) => setUsername(text)}
          placeholder="Username"
        />
      </View>
      <View>
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
        />
      </View>
      <View>
        <Pressable onPress={handleSubmit}>
          <Text>Submit</Text>
        </Pressable>
      </View>
    </View>
  );
};

describe('Form', () => {
  it('calls function provided by onSubmit prop after pressing the submit button', () => {
    // Mock functions are also known as "spies", because they let you spy on the behavior of a function that is called indirectly by some other code,
    // rather than only testing the output. You can create a mock function with jest.fn()
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <Form onSubmit={onSubmit} />
    );

    fireEvent.changeText(getByPlaceholderText('Username'), 'kalle');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password');
    fireEvent.press(getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledTimes(1);

    // onSubmit.mock.calls[0][0] contains the first argument of the first call
    expect(onSubmit.mock.calls[0][0]).toEqual({
      username: 'kalle',
      password: 'password',
    });
  });
});
