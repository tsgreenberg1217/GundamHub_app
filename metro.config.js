const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */

const USE_MOCKS = process.env.USE_MOCKS === '1';

const MOCK_MAP = {
  [path.resolve(__dirname, 'src/services/apolloClient.ts')]:
    path.resolve(__dirname, 'src/services/__mocks__/apolloClient.ts'),
  [path.resolve(__dirname, 'src/services/chatService.ts')]:
    path.resolve(__dirname, 'src/services/__mocks__/chatService.ts'),
};

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

const svgConfig = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer/react-native'),
  },
  resolver: {
    assetExts: [...assetExts.filter((ext) => ext !== 'svg'), 'lottie'],
    sourceExts: [...sourceExts, 'svg'],
  },
};

const mockConfig = USE_MOCKS
  ? {
      resolver: {
        resolveRequest: (context, moduleName, platform) => {
          const resolution = context.resolveRequest(context, moduleName, platform);
          console.log('Resolving:', moduleName, '->', resolution?.filePath);
          if (resolution.type === 'sourceFile' && MOCK_MAP[resolution.filePath]) {
            console.log('Redirecting to mock:', MOCK_MAP[resolution.filePath]);
            return { ...resolution, filePath: MOCK_MAP[resolution.filePath] };
          }
          return resolution;
        },
      },
    }
  : {};

module.exports = mergeConfig(mergeConfig(defaultConfig, svgConfig), mockConfig);
