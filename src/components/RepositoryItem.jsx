import Text from './Text';

const styles = StyleSheet.create({
  tinyLogo: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  viewCard: {
    display: 'flex',
    padding: 15,
    backgroundColor: '#e1e4e8',
  },
  viewCardItemA: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  viewCardItemA1: {
    display: 'flex',
    padding: 10,
  },
  viewCardItemB: {
    display: 'flex',
  },
  viewCardItemB1: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  viewCardItemB2: {
    justifyContent: 'space-evenly',
  },
});

const RepositoryItem = ({ item }) => {
  // Counts, such as number of stars and forks, larger than or equal to 1000 should be displayed in thousands with precision of one decimal and with a "k" suffix
  const formattedNumber = (number) => {
    const round = (number) => Math.round(number * 10) / 10;

    if (typeof number !== 'number') return null;
    if (number < 1000) return number;
    return `${round(number / 1000)}k`;
  };

  // console.log("item from data", item);
  return (
    <View style={styles.viewCard}>
      <View style={styles.viewCardItemA}>
        <Image style={styles.tinyLogo} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.viewCardItemA1}>
          <Text fontSize="subheading" fontWeight="bold">
            {item.fullName}
          </Text>
          <Text color="textSecondary">{item.description}</Text>
          <Text>
            <Text backgroundColor="backgroundBlueColor">{item.language}</Text>
          </Text>
        </View>
      </View>
      <View style={styles.viewCardItemB}>
        <View style={styles.viewCardItemB1}>
          <View style={styles.viewCardItemB2}>
            <Text>{formattedNumber(item.stargazersCount)}</Text>
            <Text color="textSecondary">Stars</Text>
          </View>
          <View style={styles.viewCardItemB2}>
            <Text>{formattedNumber(item.forksCount)}</Text>
            <Text color="textSecondary">Forks</Text>
          </View>
          <View style={styles.viewCardItemB2}>
            <Text>{formattedNumber(item.reviewCount)}</Text>
            <Text color="textSecondary">Reviews</Text>
          </View>
          <View style={styles.viewCardItemB2}>
            <Text>{formattedNumber(item.ratingAverage)}</Text>
            <Text color="textSecondary">Rating</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
