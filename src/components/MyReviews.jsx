import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { GET_CURRENT_USER } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import Text from './Text';
import theme from '../theme';
import { format } from 'date-fns';
import Button from './Button';
import useDeleteReview from '../hooks/useDeleteReview';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  viewCard: {
    flexDirection: 'row',
    backgroundColor: theme.backgroundColors.backgroundMainColor,
  },
  viewCardItemA: {
    padding: 15,
    marginRight: 60,
    paddingBottom: 0,
  },
  ratingStyle: {
    marginTop: 15,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25, // width / 2 to get a circular border of around a element
    borderWidth: 3,
    borderColor: theme.backgroundColors.backgroundBlueColor,
  },
  deleteButton: {
    margin: 20,
    backgroundColor: theme.colors.error, // background color red
    width: '100%',
    alignSelf: 'center',
  },
  repoButton: {
    margin: 15,
    backgroundColor: theme.backgroundColors.backgroundBlueColor,
    width: '100%',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
  },
  viewCardB: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: theme.backgroundColors.backgroundMainColor,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review, deleteReview, refetch, navigate }) => {
  const onDelete = async () => {
    const id = review.id;
    // console.log('delete review id', id);

    await deleteReview({ id });
    refetch();
  };

  // confirmation window . If the user confirms the deletion, the review is deleted. Otherwise, the deletion is discarded.
  const showAlert = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Alert window cancel clicked');
          },
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            onDelete();
          },
        },
      ],
      {
        cancelable: true, // you can cancel the alert dialog box by clicking cancel button outside of the alert dialog box
      }
    );
  };

  const onPressShow = () => {
    navigate(`/${review.repositoryId}`, { replace: true });
  };

  // Single review item
  return (
    <View>
      <View style={styles.viewCard}>
        <View style={styles.ratingStyle}>
          <Text color="primary" fontSize="subheading" fontWeight="bold">
            {review.rating}
          </Text>
        </View>
        <View style={styles.viewCardItemA}>
          <Text fontSize="subheading" fontWeight="bold">
            {review.repository.fullName}
          </Text>
          <Text color="textSecondary">
            {format(new Date(review.createdAt), 'dd.MM.yyyy')}
          </Text>
          <Text>{review.text}</Text>
        </View>
      </View>
      <View style={styles.viewCardB}>
        <Button onPress={onPressShow} style={styles.repoButton}>
          <Text
            fontSize="subheading"
            fontWeight="bold"
            style={styles.buttonText}
          >
            View repository
          </Text>
        </Button>
        <Button onPress={showAlert} style={styles.deleteButton}>
          <Text
            fontSize="subheading"
            fontWeight="bold"
            style={styles.buttonText}
          >
            Delete review
          </Text>
        </Button>
      </View>
    </View>
  );
};

const MyReviews = () => {
  // use query GET_CURRENT_USER to check if the user is authenticated i.e. has access token or not authenticated i.e. query returns null
  const { data, loading, refetch } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews: true },
  });
  const [deleteReview] = useDeleteReview();
  const navigate = useNavigate();

  if (loading) return <Text>Loading...</Text>;
  // console.log('query GET_CURRENT_USER to get authenticated user details with reviews', data);

  // Since the data is paginated in a common cursor based pagination format. The actual repository data is behind the node key in the edges array.
  // Get the nodes from the edges array
  const reviews = data.me.reviews
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <>
      <FlatList
        data={reviews}
        renderItem={({ item }) => (
          <ReviewItem
            review={item}
            deleteReview={deleteReview}
            refetch={refetch}
            navigate={navigate}
          />
        )}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ItemSeparator}
      />
    </>
  );
};

export default MyReviews;
