import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
  backGroundColorBlue: {
    backgroundColor: theme.backgroundColors.backgroundBlueColor,
  },
  backgroundColorMain: {
    backgroundColor: theme.backgroundColors.backgroundMainColor,
  },
  backGroundColorPink: {
    backgroundColor: theme.button.backgroundPinkColor,
  },
});

const Text = ({
  color,
  fontSize,
  fontWeight,
  backgroundColor,
  style,
  ...props
}) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    backgroundColor === 'backgroundBlueColor' && styles.backGroundColorBlue,
    backgroundColor === 'backgroundMainColor' && styles.backgroundColorMain,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    backgroundColor === 'backgroundPinkColor' && styles.backGroundColorPink,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;
