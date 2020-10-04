import { readFileSync } from 'fs';
import { compact } from 'lodash';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import { join } from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import { Configuration } from 'webpack';
import { AddFilePlugin } from './addFilePlugin';
import { APPLICATION_NAME } from './constants';
import createBabelRule from './createBabelRule';

export default function (
  outputPath: string,
  mode: 'production' | 'development',
  electronVersion: string,
  version: string,
  author: string,
  contributors: object
) {
  const config: Configuration = {
    entry: {
      index: require.resolve('@koar/main'),
    },
    mode,
    devtool: mode === 'production' ? 'source-map' : 'cheap-module-source-map',
    bail: true,
    target: 'electron-main',
    resolve: {
      extensions: ['.js'],
    },
    node: {
      __dirname: false,
    },
    optimization: {
      concatenateModules: true,
      splitChunks: false,
      minimizer: compact([
        mode === 'production' &&
          new TerserPlugin({
            cache: true,
            parallel: true,
            sourceMap: true,
            terserOptions: { output: { comments: false } },
          }),
      ]),
    },
    output: {
      filename: '[name].js',
      path: outputPath,
    },
    module: {
      rules: [
        createBabelRule(electronVersion),
        {
          test: /\.jsx?$/,
          use: 'source-map-loader',
          exclude: /node_modules(?![\\/][@]koar)/,
          enforce: 'pre',
        },
      ],
    },
    plugins: [
      new LodashModuleReplacementPlugin({
        collections: true,
        paths: true,
      }),
      new AddFilePlugin({
        name: '../resources/icon.ico',
        value: readFileSync(join(__dirname, '..', 'app.ico')),
      }),
      new AddFilePlugin({
        name: 'package.json',
        value: JSON.stringify({
          description: `${APPLICATION_NAME}${
            mode === 'development' ? ' (DEV)' : ''
          }`,
          productName: `${APPLICATION_NAME}${
            mode === 'development' ? ' (DEV)' : ''
          }`,
          name: `${APPLICATION_NAME.replace(/\s/g, '-')}${
            mode === 'development' ? '_dev' : ''
          }`.toLowerCase(),
          version,
          main: 'index.js',
          author,
          contributors,
        }),
      }),
    ],
  };

  return config;
}
