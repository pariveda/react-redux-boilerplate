const path = require('path');

// load the default config generator.
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');
module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env);
  // Extend it as you need.
  // For example, add typescript loader:
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('awesome-typescript-loader'),
    query: {
      configFileName: path.resolve('.storybook', 'tsStories.json'),
      transpileOnly: true,
      useCache: true,
      silent: true,
    },
  });
  config.resolve.extensions.push('.ts', '.tsx', 'json');
  config.resolve.modules.push(path.resolve('./node_modules'));
  config.resolve.modules.push(path.resolve('./app'));
  config.resolve.modules.push(path.resolve('./app/redux'));
  config.resolve.modules.push(path.resolve('./static'));
  return config;
};
