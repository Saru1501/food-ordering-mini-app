const { withNativeWind } = require('nativewind/metro');
const {
  getSentryExpoConfig
} = require("@sentry/react-native/metro");
 
// const { getDefaultConfig } = require("expo/metro-config");
const { getDefaultConfig } = require('expo/metro-config');
//const { getSentryExpoConfig } = require("@sentry/react-native/metro");

// const config = getDefaultConfig(__dirname);
const config = getDefaultConfig(__dirname);//const config = getSentryExpoConfig(__dirname);
 
module.exports = config;// delete module.exports = withNativeWind(config, { input: './global.css' })



