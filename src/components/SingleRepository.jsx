import { View, FlatList, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useParams } from 'react-router-native';
import { SINGLE_REPOSITORY } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import Text from './Text';
import theme from '../theme';
import { format } from 'date-fns';

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
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  // Repository's information implemented in the previous exercise
  return (
    <View>
      <RepositoryItem item={repository} showGithubUrlButton={true} />
      <ItemSeparator />
    </View>
  );
};

const ReviewItem = ({ review }) => {
  // Single review item
  return (
    <View style={styles.viewCard}>
      <View style={styles.ratingStyle}>
        <Text color="primary" fontSize="subheading" fontWeight="bold">
          {review.rating}
        </Text>
      </View>
      <View style={styles.viewCardItemA}>
        <Text fontSize="subheading" fontWeight="bold">
          {review.user.username}
        </Text>
        <Text color="textSecondary">
          {format(new Date(review.createdAt), 'dd.MM.yyyy')}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  // console.log('useParams id data', id);
  const { data, loading } = useQuery(SINGLE_REPOSITORY, {
    variables: { repositoryId: id },
  });

  if (loading) return <Text>Loading...</Text>;

  // console.log('useQuery of URL data', data);
  const repository = data.repository;

  // Since the data is paginated in a common cursor based pagination format. The actual repository data is behind the node key in the edges array.
  // Get the nodes from the edges array
  const reviews = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default SingleRepository;
