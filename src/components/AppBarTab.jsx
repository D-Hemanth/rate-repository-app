import { Pressable, View, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

const AppBarTab = ({ tabName }) => {
  return (
    <View>
      <Pressable>
        <Text
          style={styles.container}
          fontWeight="bold"
          fontSize="subheading"
          backgroundColor="backgroundBlueColor"
        >
          {tabName}
        </Text>
      </Pressable>
    </View>
  );
};

export default AppBarTab;
