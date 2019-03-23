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

const width = 375;
const height = 372;

if (process.platform === 'darwin') {
  app.dock.hide();
}

app.on('ready', () => {
  const tray = new Tray(
    path.join(__dirname, '../resources/menu-icons/iconTemplate.png'),
  );
  let window = null;
  const showWindow = () => {
    const trayPos = tray.getBounds();
    const windowPos = window.getBounds();
    let x = null;
    let y = 0;
    if (process.platform === 'darwin') {
      x = Math.round(trayPos.x + trayPos.width / 2 - windowPos.width / 2);
      y = Math.round(trayPos.y + trayPos.height);
    } else if (process.platform === 'win32') {
      const { screen } = require('electron'); // eslint-disable-line
      const primaryDisplay = screen.getPrimaryDisplay();
      const { width: screenWidth, height: screenHeight } = primaryDisplay.size;
      x = screenWidth - width - 10;
      y = screenHeight - height - 40;
    } else {
      x = Math.round(trayPos.x + trayPos.width / 2 - windowPos.width / 2);
      y = Math.round(trayPos.y + trayPos.height * 10);
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
      backgroundThrottling: false,
    },
  });

  window.loadURL(`file://${__dirname}/app.html`);

  window.on('blur', () => {
    if (!window.webContents.isDevToolsOpened()) {
      window.hide();
    }
  });

  window.on('show', () => {
    tray.setHighlightMode('always');
  });

  window.on('hide', () => {
    tray.setHighlightMode('never');
  });

  window.webContents.on('will-navigate', (event, url) => {
    event.preventDefault();
    if (url.startsWith('http:') || url.startsWith('https:')) {
      shell.openExternal(url);
    }
  });
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
