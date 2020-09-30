import { app } from 'electron';

const isLocked = app.requestSingleInstanceLock();
if (!isLocked) {
  app.quit();
}

app.commandLine.appendSwitch('ignore-certificate-errors');
