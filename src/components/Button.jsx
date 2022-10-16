import { Pressable, View, StyleSheet } from 'react-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.button.backgroundPinkColor,
  },
});

const Button = ({ children, style, ...props }) => {
  const buttonStyle = [style, styles.button];

  return (
    <Pressable {...props}>
      <View style={buttonStyle}>
        <Text color="textPrimary" fontWeight="bold">
          {children}
        </Text>
      </View>
    </Pressable>
  );
};

export default Button;
