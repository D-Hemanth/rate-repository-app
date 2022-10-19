import { View } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useParams } from 'react-router-native';
import { URL } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import Text from './Text';

const SingleRepository = () => {
  const { id } = useParams();
  // console.log('useParams id data', id);
  const { data, loading } = useQuery(URL, {
    variables: { repositoryId: id },
  });

  if (loading) return <Text>Loading...</Text>;

  // console.log('useQuery of URL data', data);

  return (
    <View>
      <RepositoryItem item={data.repository} showGithubUrlButton={true} />
    </View>
  );
};

export default SingleRepository;
