// import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import Text from '../components/Text';

const useRepositories = ({ orderDirection }) => {
  // console.log('orderDirection', orderDirection);

  // use graphql query to get the rate repository data from apollo server backend
  const { data, loading, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { orderDirection: orderDirection },
  });
  // console.log('all repositories query results', data);

  if (loading) return <Text>Loading ...</Text>;

  const repositories = data.repositories;

  return { repositories, loading, ...result };
};

export default useRepositories;
