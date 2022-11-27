import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { presets } from '../babel.config';
import path from 'path';

const extensions = ['.js', '.jsx', '.json', '.ts', '.tsx'];

const config: Configuration = {
  entry: path.join(process.cwd(), 'src', 'index.tsx'),
  output: {
    publicPath: '/',
    path: path.join(process.cwd(), 'build'),
    filename: 'index.bundle.js',
  },
  resolve: {
    alias: {
      '@screens': path.join(process.cwd(), 'src', 'screens'),
      '@shared': path.join(process.cwd(), 'src', 'shared'),
      '@applcation': path.join(process.cwd(), 'src', 'applcation'),
    },
    plugins: [
      new TsconfigPathsPlugin({
        baseUrl: path.join(process.cwd(), 'src'),
        extensions,
      }),
    ],
    extensions,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), 'public', 'index.html'),
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets,
            },
          },
        ],
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|ttf|woff)$/,
        use: ['file-loader'],
      },
    ],
  },
};

export default config;
