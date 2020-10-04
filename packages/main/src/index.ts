import { WINDOW_GET_ID } from '@koar/shared';
import { app, BrowserWindow, ipcMain } from 'electron';
import { platform } from 'os';
import { join } from 'path';
import { pathToFileURL } from 'url';
import { ProcessState } from './processState';

const isLocked = app.requestSingleInstanceLock();
if (!isLocked) {
  app.quit();
}

app
  .once('ready', () => {
    createMainWindow();
  })
  .once('before-quit', () => {})
  .on('window-all-closed', function () {
    ProcessState.mainWindow = undefined;
    if (platform() !== 'darwin') {
      app.quit();
    }
  })
  .on('activate', function () {
    if (platform() === 'darwin' && !ProcessState.mainWindow) {
      createMainWindow();
    }
  })
  .on('second-instance', () => ProcessState.mainWindow?.focus());

const createMainWindow = () => {
  const window = (ProcessState.mainWindow = new BrowserWindow({
    webPreferences: {
      enableRemoteModule: false,
      nodeIntegration: true,
    },
    show: false,
    frame: false,
    alwaysOnTop: false,
    maximizable: true,
    resizable: true,
    minimizable: true,
    skipTaskbar: false,
    minWidth: 200,
    minHeight: 200,
    center: true,
  }));
  const { id } = window;

  ipcMain.handle(WINDOW_GET_ID, () => id);

  const filePath = join(__dirname, 'renderer', 'index.html');
  window.loadURL(pathToFileURL(filePath).toString());
  window
    .once('ready-to-show', () => window.show())
    .once('close', () => {
      ipcMain.removeHandler(WINDOW_GET_ID);
    });
};
