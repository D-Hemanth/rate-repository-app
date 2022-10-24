import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import useSignOut from '../hooks/useSignOut';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  },
});

const AppBar = () => {
  // use query ME to check if the user is authenticated i.e. has access token or not authenticated i.e. query returns null
  const { data, loading, error } = useQuery(ME);
  // console.log('query ME to get authenticated user details', data);
  const [signOut] = useSignOut();
  const navigate = useNavigate();

  const signOutUser = async () => {
    // use the signOut function to perform the user logout
    await signOut();
    // on successful logout redirect user to repositories homepage
    navigate('/', { replace: true });
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab tabName="Repositories" tabView="/" />
        {!loading && !error && data.me ? (
          <>
            <AppBarTab tabName="Create a review" tabView="/createReview" />
            <AppBarTab tabName="My Reviews" tabView="/myReviews" />
            <AppBarTab tabName="Sign out" handleSignOut={signOutUser} />
          </>
        ) : (
          <>
            <AppBarTab tabName="Sign In" tabView="/signIn" />
            <AppBarTab tabName="Sign Up" tabView="/signUp" />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
