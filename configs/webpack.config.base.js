/**
 * Base webpack config used across other specific configs
 */

import path from 'path';
import webpack from 'webpack';
import Dotenv from 'dotenv-webpack';
import { dependencies } from '../package.json';

export default {
  externals: [...Object.keys(dependencies || {})],
  target: 'electron-main',
  node: {
    __dirname: false,
    __filename: false
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      }
    ]
  },

  output: {
    path: path.join(__dirname, '..', 'app'),
    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      app: path.resolve(__dirname, '../app')
    }
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    }),
    new Dotenv(),
    new webpack.NamedModulesPlugin()
  ]
};
