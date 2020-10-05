import { accessSync } from 'fs';
import { join, resolve } from 'path';

export function findPackageFile(directory: string) {
  while (true) {
    try {
      const packageFile = resolve(directory, 'package.json');
      accessSync(packageFile);
      return packageFile;
    } catch (error) {
      if (directory === '/') {
        throw new Error('At root.');
      }
      directory = join(directory, '..');
    }
  }
}
