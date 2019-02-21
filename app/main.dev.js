// @flow /*

const { app, BrowserWindow, Tray, shell } = require('electron');
const path = require('path');
const AutoLaunch = require('auto-launch');

app.dock.hide();

app.on('ready', () => {
  const tray = new Tray(
    path.join(__dirname, '../resources/menu-icons/iconTemplate.png')
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
  tray.on('click', event => {
    toggleWindow();

    if (window.isVisible() && process.defaultApp && event.metaKey) {
      window.openDevTools({ mode: 'detach' });
    }
  });

  window = new BrowserWindow({
    width: 375,
    height: 372,
    show: false,
    frame: false,
    resizable: false,
    skipTaskbar: true,
    fullscreenable: false,
    transparent: true,
    webPreferences: {
      backgroundThrottling: false
    }
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

const minecraftAutoLauncher = new AutoLaunch({
  name: 'Unsplash Wallpapers',
  path: '/Applications/Unsplash Wallpapers.app' // eslint-disable-line
});
minecraftAutoLauncher.enable();
minecraftAutoLauncher
  .isEnabled()
  .then(isEnabled => {
    if (!isEnabled) {
      return minecraftAutoLauncher.enable();
    }
    return null;
  })
  .catch(err => {
    console.log(err);
  });
