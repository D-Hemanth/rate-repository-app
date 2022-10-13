import { View, Text, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  viewCard: {
    display: 'flex',
  },
  viewCardItem: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    // flexWrap: 'wrap',
  },
});

const RepositoryItem = ({ item }) => {
  // console.log("item from data", item);
  return (
    <View style={styles.viewCard}>
      <View style={styles.viewCardItem}>
        <Image style={styles.tinyLogo} source={{ uri: item.ownerAvatarUrl }} />
        <View>
          <Text>{item.fullName}</Text>
          <Text>{item.description}</Text>
          <Text>{item.language}</Text>
        </View>
      </View>
      <View>
        <Text>{item.stargazersCount}</Text>
        <Text>{item.forksCount}</Text>
        <Text>{item.reviewCount}</Text>
        <Text>{item.ratingAverage}</Text>
      </View>
    </View>
  );
};

export default RepositoryItem;
