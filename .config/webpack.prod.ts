import CompressionPlugin from 'compression-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import webpackMain from './webpack.config';

const configForProduction: Configuration = merge(webpackMain, {
  mode: 'production',
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: {
      name: 'manifest',
    },
    minimize: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
        shared: {
          test: /[\\/]src[\\/]shared[\\/]/,
          chunks: 'all',
        },
      },
    },
  },
  performance: {
    hints: 'error',
    maxAssetSize: 650 * 1024,
    maxEntrypointSize: 650 * 1024,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: path.join('public', '[name]-[contenthash].css'),
    }),
    new CompressionPlugin(),
    new Dotenv({
      path: path.join(process.cwd(), '.env.production'),
      allowEmptyValues: true,
      expand: true,
      systemvars: true,
    }),
  ],
});

export default configForProduction;
