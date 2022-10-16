import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  error: {
    borderColor: theme.colors.error,
    borderWidth: 2,
  },
});

const TextInput = ({ style, error, ...props }) => {
  // On top of the red error message from style prop value, give an invalid field a visual indication of an error by giving it a red border color using conditional rendering of error style
  const textInputStyle = [style, error && styles.error];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
