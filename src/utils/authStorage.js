import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  // Because AsyncStorage keys are global, it is usually a good idea to add a namespace for the keys.
  // In this context, the namespace is just a prefix we provide for the storage abstraction's keys.
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  getAccessToken() {
    // Get the access token for the storage
    return AsyncStorage.getItem(`${this.namespace}:accessToken`);
  }

  setAccessToken(accessToken) {
    // Add the access token to the storage
    return AsyncStorage.setItem(`${this.namespace}:accessToken`, accessToken);
  }

  removeAccessToken() {
    // Remove the access token from the storage
    return AsyncStorage.removeItem(`${this.namespace}:accessToken`);
  }
}

export default AuthStorage;
