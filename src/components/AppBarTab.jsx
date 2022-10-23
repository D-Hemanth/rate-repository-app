import { View, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingRight: 10,
    paddingLeft: 15,
    color: 'white',
    backgroundColor: theme.backgroundColors.backgroundBlueColor,
  },
});

const AppBarTab = ({ tabName, tabView, handleSignOut }) => {
  return (
    <View>
      {/* use Link method from react native router to link the routes with their content */}
      <Link to={tabView} onPress={handleSignOut}>
        <Text style={styles.container} fontWeight="bold" fontSize="subheading">
          {tabName}
        </Text>
      </Link>
    </View>
  );
};

export default AppBarTab;
