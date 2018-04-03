const Dotenv = require('dotenv-webpack');
const withTs = require('@zeit/next-typescript');
const path = require('path');
const assetPrefix = require('./app/helpers/asset-prefix.ts');

module.exports = withTs({
  assetPrefix,
  webpack: (config, { dev }) => {
    config.devtool = 'cheap-module-source-map';
    config.plugins = config.plugins || [];

    // Polyfill for IE11
    // https://github.com/zeit/next.js/issues/2468
    // const oldEntry = config.entry;
    // config.entry = () => {
    //   return oldEntry().then(entries => {
    //     entries['main.js'].unshift('core-js');
    //     return entries;
    //   });
    // };
    config.plugins = config.plugins.filter(plugin => {
      const name = plugin.constructor.name;
      return name !== 'ModuleConcatenationPlugin';
    });

    /**
     * Use HSS_ZIP to compile unminified code ONLY to create Veracode zip.
     * Please do not use this variable for dev or prod cases
     */
    if (process.env.HSS_ZIP) {
      config.plugins = config.plugins.filter(plugin => {
        const name = plugin.constructor.name;
        return name !== 'UglifyJsPlugin' && name !== 'ModuleConcatenationPlugin';
      });
    }
    config.plugins.push(new Dotenv());

    // Also tried TsConfigPathsPlugin here but got javascript heap out of memory error
    config.resolve.modules.push(path.resolve('./node_modules'));
    config.resolve.modules.push(path.resolve('./app'));
    config.resolve.modules.push(path.resolve('./app/redux'));
    config.resolve.modules.push(path.resolve('./static'));

    return config;
  },
});
