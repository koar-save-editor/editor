import { compact } from 'lodash';
import TerserPlugin from 'terser-webpack-plugin';
import { Configuration } from 'webpack';

export default async function (
  outputPath: string,
  isProd: boolean,
  electronVersion: string
) {
  const config: Configuration = {
    entry: {
      index: require.resolve('@koar/main'),
    },
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? 'source-map' : 'cheap-module-source-map',
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
        isProd &&
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
  };

  return config;
}
