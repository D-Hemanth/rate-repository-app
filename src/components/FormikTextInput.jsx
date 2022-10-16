import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  errorText: {
    color: theme.colors.error,
    marginBottom: 5,
    paddingRight: 15,
    paddingLeft: 15,
  },
  userInput: {
    margin: 10,
    marginRight: 15,
    marginLeft: 15,
    padding: 10,
    backgroundColor: theme.backgroundColors.backgroundMainColor,
    borderColor: theme.colors.lightgrey,
    borderRadius: 5,
    borderWidth: 3,
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);

  // Check if the user input form field is touched and the error message is present
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        style={styles.userInput}
        error={showError}
        {...props}
      />
      {/* Show the error message if the value of showError variable is true  */}
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;
