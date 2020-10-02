import { compact, Dictionary } from 'lodash';
import { dirname, join } from 'path';
import createMainConfig from './createMainConfig';
import { findPackageFile } from './utils';

export default async ({ NODE_ENV: env = 'dev' }: Dictionary<string> = {}) => {
  const outputPath = join(
    __dirname,
    ...compact([
      __dirname.includes('node_modules') && '..',
      '..',
      '..',
      '..',
      'dist',
      'app',
    ])
  );
  const isProd = env.toLowerCase() === 'prod';
  const {
    version: electronVersion,
  }: Dictionary<string> = require(findPackageFile(
    dirname(require.resolve('electron'))
  ));
  return [await createMainConfig(outputPath, isProd, electronVersion)];
};
