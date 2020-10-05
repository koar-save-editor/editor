import { compact } from 'lodash';
import { major } from 'semver';
import { RuleSetRule } from 'webpack';

export default (electronVersion: string, react?: boolean): RuleSetRule => ({
  test: new RegExp(`\\.js${react ? 'x?' : ''}$`),
  exclude: /node_modules(?![\\/]\@widgets)/,
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      babelrc: false,
      presets: compact<string | [string, object?]>([
        [
          '@babel/preset-env',
          { targets: { electron: major(electronVersion) } },
        ],
        react && '@babel/preset-react',
      ]),
      plugins: compact<string | [string, object?]>([
        'lodash',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-optional-chaining',
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
        react && ['transform-react-remove-prop-types', { mode: 'wrap' }],
      ]),
    },
  },
});
