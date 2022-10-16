import { Pressable, View, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: theme.backgroundColors.backgroundBlueColor,
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
          >
            {tabName}
          </Text>
        </Link>
      </Pressable>
    </View>
  );
};

export default AppBarTab;
