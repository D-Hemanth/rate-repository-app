import { useState, useEffect } from 'react';

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);

  // get data from the rate repository api server backend using apollo server with sqLite & use fetch() method to fetch data from the server
  const fetchRepositories = async () => {
    setLoading(true);

    // Replace the IP address part with your own IP address!
    const response = await fetch('http://192.168.1.8:5000/api/repositories');
    const json = await response.json();

    setLoading(false);
    setRepositories(json);
  };

  // use useEffect to call the fetch repositories function on every refresh
  useEffect(() => {
    fetchRepositories();
  }, []);

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;
