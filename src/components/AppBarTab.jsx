import { Pressable, View, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

const AppBarTab = ({ tabName, tabView }) => {
  return (
    <View>
      <Pressable>
        {/* use Link method from react native router to link the routes with their content */}
        <Link to={tabView}>
          <Text
            style={styles.container}
            fontWeight="bold"
            fontSize="subheading"
            backgroundColor="backgroundBlueColor"
          >
            {tabName}
          </Text>
        </Link>
      </Pressable>
    </View>
  );
};

export default AppBarTab;
