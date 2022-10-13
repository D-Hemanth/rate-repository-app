import { Pressable, View } from 'react-native';
import Text from './Text';

const AppBarTab = ({ tabName }) => {
  return (
    <View>
      <Pressable>
        <Text
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
