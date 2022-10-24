import { useQuery } from '@apollo/client';
import { SINGLE_REPOSITORY } from '../graphql/queries';
import Text from '../components/Text';

const useRepository = (variables) => {
  // console.log('variables', variables);

  const { data, loading, fetchMore, ...result } = useQuery(SINGLE_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  if (loading) return <Text>Loading...</Text>;
  // console.log('useQuery of SINGLE_REPOSITORY data', data);

  return {
    repository: data?.repository,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepository;
