import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  picker: {
    padding: 15,
    backgroundColor: '#C4CAD2',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

// export RepositoryListContainer having only the pure code without graphql query so that we can use it in testing
export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    // this.props contains the component's props
    const { orderDirection, setOrderDirection, searchQuery, setSearchQuery } =
      this.props;

    const onChangeSearch = (query) => setSearchQuery(query);

    // use the picker package & orderDirection useState hook to filter the repositories by their rating
    return (
      <View style={styles.picker}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <Picker
          selectedValue={orderDirection}
          onValueChange={(itemValue) =>
            setOrderDirection(itemValue || undefined)
          }
          prompt="Select ordering criteria"
        >
          <Picker.Item label="Latest repositories" value="" />
          <Picker.Item label="Highest rated repositories" value="DESC" />
          <Picker.Item label="Lowest rated repositories" value="ASC" />
        </Picker>
      </View>
    );
  };

  render() {
    const { repositories, navigate } = this.props;

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

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

// get data from the rate repository api server backend using useRepositories() function component
const RepositoryList = () => {
  // orderDirection hook to filter the repositories by their orderDirection of Rating values
  const [orderDirection, setOrderDirection] = useState(undefined);
  // use useState for filtering the reviewed repositories list based on a keyword/query parameter
  const [searchQuery, setSearchQuery] = useState('');
  // To avoid a multitude of unnecessary requests while the user types the keyword fast, only pick the latest input after a short delay using useDebounce
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const { repositories } = useRepositories({
    orderDirection,
    debouncedSearchQuery,
  });
  const navigate = useNavigate();

  return (
    <RepositoryListContainer
      repositories={repositories}
      orderDirection={orderDirection}
      setOrderDirection={setOrderDirection}
      setSearchQuery={setSearchQuery}
      searchQuery={searchQuery}
      navigate={navigate}
    />
  );
};

export default RepositoryList;
