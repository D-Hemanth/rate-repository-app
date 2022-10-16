// Before we can start using Apollo Client, we will need to slightly configure the Metro bundler so that it handles the .cjs file extensions used by the Apollo Client.
// First, let's install the @expo/metro-config package which has the default Metro configuration and then add in support for '.cjs' files

const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.sourceExts.push('cjs');

module.exports = defaultConfig;
