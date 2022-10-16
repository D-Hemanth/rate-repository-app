// import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import Text from '../components/Text';

const useRepositories = () => {
  // const [repositories, setRepositories] = useState();
  // const [loading, setLoading] = useState(false);

  // // get data from the rate repository api server backend using apollo server with sqLite & use fetch() method to fetch data from the server
  // const fetchRepositories = async () => {
  //   setLoading(true);

  //   // Replace the IP address part with your own IP address!
  //   const response = await fetch('http://192.168.1.8:5000/api/repositories');
  //   const json = await response.json();

  //   setLoading(false);
  //   setRepositories(response);
  // };

  // // use useEffect to call the fetch repositories function on every refresh
  // useEffect(() => {
  //   fetchRepositories();
  // }, []);

  // use graphql query to get the rate repository data from apollo server backend
  const { data, loading, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });
  console.log('all repositories query results', data);

  if (loading) return <Text>Loading ...</Text>;

  const repositories = data.repositories;

  return { repositories, loading, ...result };
};

export default useRepositories;
