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

app.allowRendererProcessReuse = true;

if (process.platform === 'darwin') {
  app.dock.hide();
}

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
      webPreferences: {
        nodeIntegration: true,
      },
    });

    window.loadURL(`file://${__dirname}/app.html`);

    window.on('blur', () => {
      if (!window.webContents.isDevToolsOpened()) {
        window.hide();
      }
    });

    window.webContents.once('did-frame-finish-load', function() {
      autoUpdater.checkForUpdatesAndNotify();
      if (process.env.NODE_ENV === 'development') {
        window.webContents.openDevTools();
      }
    });

    window.webContents.on('will-navigate', (event, url) => {
      event.preventDefault();
      if (url.startsWith('http:') || url.startsWith('https:')) {
        shell.openExternal(url);
      }
    });

    autoUpdater.logger = log;
    autoUpdater.logger.transports.file.level = 'info';
    autoUpdater.on('update-downloaded', () => {
      window.webContents.send('update-message', 'Update downloaded');
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

app.commandLine.appendSwitch('ignore-certificate-errors');
