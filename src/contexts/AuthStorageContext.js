import React from 'react';

// React Context is just the method we need for sending the authorization token with each apollo client request
const AuthStorageContext = React.createContext();

export default AuthStorageContext;
