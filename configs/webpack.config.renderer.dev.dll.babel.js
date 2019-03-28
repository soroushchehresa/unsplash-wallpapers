import webpack from 'webpack';
import path from 'path';
import merge from 'webpack-merge';
import baseConfig from './webpack.config.base';
import { dependencies } from '../package.json';
import CheckNodeEnv from '../internals/scripts/CheckNodeEnv';

CheckNodeEnv('development');

const dist = path.join(__dirname, '..', 'dll');

export default merge.smart(baseConfig, {
  context: path.join(__dirname, '..'),
  devtool: 'source-map',
  mode: 'development',
  target: 'electron-main',
  externals: ['fsevents', 'crypto-browserify'],
  module: require('./webpack.config.renderer.dev.babel').default.module, // eslint-disable-line
  entry: {
    renderer: Object.keys(dependencies || {}),
  },
  output: {
    library: 'renderer',
    path: dist,
    filename: '[name].dev.dll.js',
    libraryTarget: 'var',
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(dist, '[name].json'),
      name: '[name]',
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: {
        context: path.join(__dirname, '..', 'app'),
        output: {
          path: path.join(__dirname, '..', 'dll'),
        },
      },
    }),
  ],
});
