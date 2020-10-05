import { compact, Dictionary } from 'lodash';
import { dirname, join } from 'path';
import createMainConfig from './createMainConfig';
import createRendererConfig from './createRendererConfig';
import { findPackageFile } from './utils';
import { compare } from 'semver';

export default ({ NODE_ENV: env = 'dev' }: Dictionary<string> = {}) => {
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
  const mode = !env.localeCompare('prod', undefined, { sensitivity: 'accent' })
    ? 'production'
    : 'development';
  const { version: electronVersion } = require(findPackageFile(
    dirname(require.resolve('electron'))
  ));
  const {
    version: verMain,
    author,
    contributors,
  } = require('../../main/package.json');
  const { version: verRenderer } = require('../../renderer/package.json');
  const version = compare(verMain, verRenderer) >= 0 ? verMain : verRenderer;

  return [
    createMainConfig(
      outputPath,
      mode,
      electronVersion,
      version,
      author,
      contributors
    ),
    createRendererConfig(join(outputPath, 'renderer'), mode, electronVersion),
  ];
};
