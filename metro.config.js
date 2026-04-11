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

const config = USE_MOCKS
  ? {
    resolver: {
      resolveRequest: (context, moduleName, platform) => {
        const resolution = context.resolveRequest(context, moduleName, platform);
        console.log("Resolving:", moduleName, "->", resolution?.filePath);
        if (resolution.type === 'sourceFile' && MOCK_MAP[resolution.filePath]) {
          console.log("Redirecting to mock:", MOCK_MAP[resolution.filePath]);
          return { ...resolution, filePath: MOCK_MAP[resolution.filePath] };
        }
        return resolution;
      },
    },
  }
  : {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
