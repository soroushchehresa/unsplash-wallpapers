// @flow

const {
  app,
  BrowserWindow,
  Tray,
  shell,
} = require('electron');
const path = require('path');
const storage = require('electron-json-storage');
const AutoLaunch = require('auto-launch');
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');

const width = 375;
const height = 385;

if (process.platform === 'darwin') {
  app.dock.hide();
}

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
});

autoUpdater.on('update-available', () => {
  sendStatusToWindow('Update available.');
});

autoUpdater.on('update-not-available', () => {
  sendStatusToWindow('Update not available.');
});

autoUpdater.on('error', (err) => {
  sendStatusToWindow('Error in auto-updater. ' + err);
});

autoUpdater.on('download-progress', (progressObj) => {
  let log_message = 'Download speed: ' + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + '/' + progressObj.total + ')';
  sendStatusToWindow(log_message);
});

autoUpdater.on('update-downloaded', () => {
  sendStatusToWindow('Update downloaded');
});

app.on('ready', () => {
  setTimeout(() => {
    const tray = new Tray(
      path.join(__dirname, '../resources/menu-icons/iconTemplate.png'),
    );
    let window = null;
    const showWindow = () => {
      const trayPos = tray.getBounds();
      const windowPos = window.getBounds();
      const { screen } = require('electron'); // eslint-disable-line
      const primaryDisplay = screen.getPrimaryDisplay();
      const { width: screenWidth } = primaryDisplay.size;
      let x = 0;
      let y = 0;

      switch (process.platform) {
        case 'win32':
          x = Math.round(trayPos.x + trayPos.width / 2 - windowPos.width / 2);
          y = Math.round(trayPos.y - height);
          break;
        case 'darwin':
          x = Math.round(trayPos.x + trayPos.width / 2 - windowPos.width / 2);
          y = Math.round(trayPos.y + trayPos.height);
          break;
        case 'freebsd':
        case 'linux':
        case 'sunos':
        default:
          x = screenWidth - width - 10;
          y = 10;
          break;
      }
      window.setPosition(x, y, false);
      window.show();
      window.focus();
    };

    const toggleWindow = () => {
      if (window.isVisible()) {
        window.hide();
      } else {
        showWindow();
      }
    };

    tray.on('right-click', toggleWindow);
    tray.on('double-click', toggleWindow);
    tray.on('click', (event) => {
      toggleWindow();

      if (window.isVisible() && process.defaultApp && event.metaKey) {
        window.openDevTools({ mode: 'detach' });
      }
    });

    window = new BrowserWindow({
      width,
      height,
      show: false,
      frame: false,
      resizable: false,
      skipTaskbar: true,
      fullscreenable: false,
      transparent: true,
    });

    window.loadURL(`file://${__dirname}/app.html`);

    window.on('blur', () => {
      if (!window.webContents.isDevToolsOpened()) {
        window.hide();
      }
    });

    window.webContents.once('did-frame-finish-load', function() {
      autoUpdater.checkForUpdatesAndNotify();
    });

    window.webContents.on('will-navigate', (event, url) => {
      event.preventDefault();
      if (url.startsWith('http:') || url.startsWith('https:')) {
        shell.openExternal(url);
      }
    });
  }, 300);
});

app.on('window-all-closed', () => {
  app.quit();
});

storage.has('isRunAtStartup', (error, hasKey) => {
  if (error) {
    throw error;
  }
  if (!hasKey) {
    storage.set('isRunAtStartup', true);
    const minecraftAutoLauncher = new AutoLaunch({
      name: 'Unsplash Wallpapers',
      path: '/Applications/Unsplash Wallpapers.app', // eslint-disable-line
    });
    minecraftAutoLauncher.enable();
  }
});
