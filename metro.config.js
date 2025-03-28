const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const baseConfig = getDefaultConfig(__dirname);
const customConfig = {
  /* your custom config */
};

const mergedConfig = mergeConfig(baseConfig, customConfig);

module.exports = withNativeWind(mergedConfig, { input: './global.css' });
