import HtmlWebpackPlugin from 'html-webpack-plugin';
import { compact } from 'lodash';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import { join } from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import { Configuration, DefinePlugin } from 'webpack';
import { APPLICATION_NAME } from './constants';
import createBabelRule from './createBabelRule';

export default function (
  outputPath: string,
  mode: 'development' | 'production',
  electronVersion: string
) {
  const config: Configuration = {
    context: process.cwd(),
    entry: {
      index: require.resolve('@koar/renderer'),
    },
    mode,
    devtool: mode === 'production' ? 'source-map' : 'cheap-module-source-map',
    bail: true,
    output: {
      filename: '[name].js',
      path: outputPath,
      publicPath: '',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    node: {
      __dirname: false,
    },
    optimization: {
      concatenateModules: false,
      minimizer:
        mode === 'production'
          ? [
              new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
                terserOptions: { output: { comments: false } },
              }),
              new OptimizeCssAssetsPlugin({
                cssProcessorOptions: {
                  mergeIdents: true,
                },
                ...{
                  cssProcessorPluginOptions: {
                    preset: [
                      'default',
                      {
                        discardComments: { removeAll: true },
                        mergeIdents: true,
                      },
                    ],
                  },
                },
              }),
            ]
          : [],
      runtimeChunk: 'single',
      noEmitOnErrors: true,
      splitChunks: {
        chunks: 'all',
      },
    },
    module: {
      rules: [
        createBabelRule(electronVersion, true),
        {
          test: /\.(woff2?|eot|ttf|png|jpg|gif)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 20000,
              fallback: 'file-loader',
            },
          },
        },
        {
          test: /\.svg(\?.*)?$/,
          use: ['svg-url-loader', 'svg-transform-loader'],
        },
        {
          test: /\.css$/,
          use: createCssUse(),
        },
        {
          test: /\.scss$/,
          include: /renderer[\\/](lib|src)[\\/]styles[\\/]main\.scss/,
          use: createCssUse(true, false),
        },
        {
          test: /\.scss$/,
          exclude: /renderer[\\/](lib|src)[\\/]styles[\\/]main\.scss/,
          use: createCssUse(true, true),
        },
        {
          test: /\.jsx?$/,
          use: 'source-map-loader',
          exclude: /node_modules(?![\\/][@]koar)/,
          enforce: 'pre',
        },
      ],
    },
    plugins: [
      new DefinePlugin({ 'process.ENV.NODE_ENV': mode }),
      new MiniCssExtractPlugin({
        chunkFilename: '[name].css',
        filename: '[name].css',
      }),
      new LodashModuleReplacementPlugin({
        collections: true,
        paths: true,
        flattening: true,
      }),
      new HtmlWebpackPlugin({
        template: join(__dirname, '../index.ejs'),
        title: APPLICATION_NAME,
        filename: 'index.html',
        minify: { collapseWhitespace: true },
      }),
    ],
  };
  return config;
}

function createCssUse(sass = false, modules = false) {
  return compact([
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        modules: modules && {
          localIdentName: '[path][name]-[local]-[hash:base64:5]',
        },
      },
    },
    sass && 'sass-loader',
  ]);
}
