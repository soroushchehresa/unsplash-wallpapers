import path from 'path';
import webpack from 'webpack';
import Dotenv from 'dotenv-webpack';
import { dependencies } from '../package.json';

export default {
  externals: [...Object.keys(dependencies || {})],
  target: 'electron-main',
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
          'react-hot-loader/webpack',
        ],
      },
    ],
  },
  output: {
    path: path.join(__dirname, '..', 'app'),
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      app: path.resolve(__dirname, '../app'),
    },
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
    new Dotenv(),
    new webpack.NamedModulesPlugin(),
  ],
};
