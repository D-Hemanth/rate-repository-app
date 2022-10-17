import { useContext } from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useAuthStorage = () => {
  // use react's useContext to access the authStorage instance using AuthStorageContext
  return useContext(AuthStorageContext);
};

export default useAuthStorage;
