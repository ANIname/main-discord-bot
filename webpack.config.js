const serverlessWebpack = require('serverless-webpack');
const nodeExternals     = require('webpack-node-externals');

const {
  ROOT_DIRECTORY_PATH,
  NODE_MODULES_DIRECTORY_PATH,
  WEBPACK_OUTPUT_DIRECTORY_PATH,
  LAMBDA_FUNCTIONS_DIRECTORY_PATH,
} = require('./constants/path');

const { IS_OFFLINE } = process.env;

module.exports = {
  entry:   serverlessWebpack.lib.entries,
  context: ROOT_DIRECTORY_PATH,
  mode:    IS_OFFLINE === 'false' ? 'production' : 'development',

  target:  'node',
  stats:   'errors-only',
  devtool: 'nosources-source-map',

  externals: [nodeExternals()],

  resolve: {
    modules: [
      ROOT_DIRECTORY_PATH,
      NODE_MODULES_DIRECTORY_PATH,
      LAMBDA_FUNCTIONS_DIRECTORY_PATH,
    ],
  },

  output: {
    path:              WEBPACK_OUTPUT_DIRECTORY_PATH,
    filename:          '[name].js',
    libraryTarget:     'commonjs2',
    sourceMapFilename: '[file].map',
  },

  optimization: {
    // Obfuscation makes it harder to read stack traces,
    // reduces bundle size a bit (but not enough to justify doing it for a server application),
    // and isn’t needed where code isn’t distributed directly to users (like over the web)
    minimize: false,
  },

  performance: {
    // Turn off size warnings for entry points
    hints: false,
  },
};
