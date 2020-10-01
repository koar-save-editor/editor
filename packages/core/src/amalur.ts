import { existsSync, readdirSync, statSync } from 'fs';
import { homedir, platform } from 'os';
import { join } from 'path';

export function findGameSaveDirectory() {
  if (platform() == 'win32') {
    const thq = join(
      homedir(),
      'appdata/LocalLow/THQNOnline/Kingdoms of Amalur Re-Reckoning/autocloud/save'
    );
    if (existsSync(thq)) {
      return thq;
    }
    const { ['ProgramFiles(x86)']: x64, ['ProgramFiles']: x86 } = process.env;
    const steamData = join(x64 || x86 || '.', 'Steam', 'userdata');
    if (existsSync(steamData)) {
      const userDirs = readdirSync(steamData).filter(name => {
        return statSync(name).isDirectory();
      });
      if (userDirs.length == 1) {
        const [dir] = userDirs;
        let directory: string;
        if (
          existsSync((directory = join(dir, '102500/remote'))) ||
          existsSync((directory = join(dir, '1041720/remote/autocloud/save')))
        ) {
          return directory;
        }
      }
    }
  }
  return process.cwd();
}
