import {
  WindowStatus,
  WINDOW_GET_ID,
  WINDOW_GET_IS_FOCUSED,
  WINDOW_GET_STATUS,
  WINDOW_IS_FOCUSED_CHANGED,
  WINDOW_MAXIMIZE,
  WINDOW_MINIMIZE,
  WINDOW_STATUS_CHANGED,
  WINDOW_UNMAXIMIZE,
} from '@koar/shared';
import { app, BrowserWindow, dialog, ipcMain } from 'electron';
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
  ipcMain.handle(WINDOW_GET_ID, () => window.id);
  ipcMain.handle(WINDOW_GET_IS_FOCUSED, function () {
    return window.isVisible() && window.isFocused();
  });
  ipcMain.handle(WINDOW_GET_STATUS, function (): WindowStatus {
    if (!window.isVisible() || window.isMinimized) {
      return 'minimized';
    }
    if (window.isMaximized()) {
      return 'maximized';
    }
    return 'normal';
  });

  ipcMain.handle(WINDOW_MAXIMIZE, () => window.maximize());
  ipcMain.handle(WINDOW_UNMAXIMIZE, () => window.unmaximize());
  ipcMain.handle(WINDOW_MINIMIZE, () => window.minimize());

  const filePath = join(__dirname, 'renderer', 'index.html');
  window.loadURL(pathToFileURL(filePath).toString());
  const { webContents } = window;

  const onFocusChange = (value: boolean) => () => {
    webContents.send(WINDOW_IS_FOCUSED_CHANGED, value);
  };
  const onStatusChange = (value: WindowStatus) => () => {
    webContents.send(WINDOW_STATUS_CHANGED, value);
  };
  const onFocus = onFocusChange(true);
  const onBlur = onFocusChange(false);
  const onMaximize = onStatusChange('maximized');
  const onMinimize = onStatusChange('minimized');
  const onNormal = onStatusChange('normal');

  window
    .addListener('focus', onFocus)
    .addListener('blur', onBlur)
    .addListener('maximize', onMaximize)
    .addListener('minimize', onMinimize)
    .addListener('unmaximize', onNormal)
    .addListener('restore', onNormal)
    .once('ready-to-show', () => window.show())
    .on('close', function (e) {
      const choice = dialog.showMessageBoxSync(window, {
        type: 'question',
        buttons: ['Yes', 'No'],
        title: 'Confirm',
        message: 'Are you sure you want to quit?',
      });
      if (choice === 1) {
        return e.preventDefault();
      }
      window
        .removeListener('focus', onFocus)
        .removeListener('blur', onBlur)
        .removeListener('maximize', onMaximize)
        .removeListener('minimize', onMinimize)
        .removeListener('unmaximize', onNormal)
        .removeListener('restore', onNormal);
      ipcMain.removeHandler(WINDOW_GET_ID);
      ipcMain.removeHandler(WINDOW_GET_IS_FOCUSED);
      ipcMain.removeHandler(WINDOW_GET_STATUS);
      ipcMain.removeHandler(WINDOW_MAXIMIZE);
      ipcMain.removeHandler(WINDOW_UNMAXIMIZE);
      ipcMain.removeHandler(WINDOW_MINIMIZE);
    });
};
