import CompressionPlugin from 'compression-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import path from 'path';
import { merge } from 'webpack-merge';
import webpackMain from './webpack.config';

module.exports = merge(webpackMain, {
  mode: 'production',
  plugins: [
    new CompressionPlugin(),
    new Dotenv({
      path: path.join(process.cwd(), '.env.production'),
      allowEmptyValues: true,
      expand: true,
      systemvars: true,
    }),
  ],
});
