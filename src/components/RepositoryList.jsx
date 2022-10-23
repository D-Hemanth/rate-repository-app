import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

// export RepositoryListContainer having only the pure code without graphql query so that we can use it in testing
export const RepositoryListContainer = ({ repositories }) => {
  const navigate = useNavigate();

  // Since the data is paginated in a common cursor based pagination format. The actual repository data is behind the node key in the edges array.
  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const singleRepoInfo = (item) => {
    // console.log('singleRepoInfo item value', item);
    navigate(`/${item.id}`);
  };

  const renderItem = ({ item }) => {
    return (
      <Pressable onPress={() => singleRepoInfo(item)}>
        <RepositoryItem item={item} />
      </Pressable>
    );
  };

  // sortingRepositories using the picker package & orderDirection useState hook
  const sortingRepositories = () => {
    return (
      <View style={styles.picker}>
        <Picker
          selectedValue={orderDirection}
          onValueChange={(itemValue) =>
            setOrderDirection(itemValue || undefined)
          }
        >
          <Picker.Item label="Latest repositories" value="" />
          <Picker.Item label="Highest rated repositories" value="DESC" />
          <Picker.Item label="Lowest rated repositories" value="ASC" />
        </Picker>
      </View>
    );
  };

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
    />
  );
};

// get data from the rate repository api server backend using useRepositories() function component
const RepositoryList = () => {
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
