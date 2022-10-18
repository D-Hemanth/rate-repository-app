import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import useSignOut from '../hooks/useSignOut';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  },
});

const AppBar = () => {
  // use query ME to check if the user is authenticated i.e. has access token or not authenticated i.e. query returns null
  const { data, loading, error } = useQuery(ME);
  // console.log('query ME to get authenticated user details', data);
  const { signOut } = useSignOut();

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab tabName="Repositories" tabView="/" />
        {!loading && !error && data.me ? (
          <AppBarTab tabName="Sign out" handleSignOut={signOut} />
        ) : (
          <AppBarTab tabName="Sign In" tabView="/signIn" />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
