const {
  override,
  addBabelPlugins,
  addWebpackAlias,
} = require('customize-cra');
const path = require("path");

module.exports = override(
  ...addBabelPlugins(
    'react-hot-loader/babel',
  ),
  addWebpackAlias({
    'react-dom': '@hot-loader/react-dom',
    components: path.resolve(__dirname, 'src/components'),
    services: path.resolve(__dirname, 'src/services'),
    containers: path.resolve(__dirname, 'src/containers'),
    styles: path.resolve(__dirname, 'src/styles'),
    utils: path.resolve(__dirname, 'src/utils'),
    images: path.resolve(__dirname, 'src/images'),
    ducks: path.resolve(__dirname, 'src/redux/ducks'),
  })
);
