const electron = require('electron');
const APP_VERSION = require('../../package.json').version;

const AUTO_UPDATE_URL = 'https://api.update.rocks/update/github.com/soroushchehresa/unsplash-wallpapers/stable/' + process.platform + '/' + APP_VERSION;

function initAutoUpdate() {
  if (process.platform === 'linux') {
    console.log('Auto updates not available on linux');
  } else {
    initDarwinWin32();
  }
}

function initDarwinWin32() {
  electron.autoUpdater.on(
    'error',
    (err) => console.error(`Update error: ${err.message}`),
  );

  electron.autoUpdater.on(
    'checking-for-update',
    () => console.log('Checking for update'),
  );

  electron.autoUpdater.on(
    'update-available',
    () => console.log('Update available'),
  );

  electron.autoUpdater.on(
    'update-not-available',
    () => console.log('No update available'),
  );

  electron.autoUpdater.on(
    'update-downloaded',
    (event, releaseNotes, releaseName) => {
      dialog.showMessageBox(window, {
        type: 'question',
        buttons: ['Update', 'Cancel'],
        defaultId: 0,
        message: `Version ${releaseName} is available, do you want to install it now?`,
        title: 'Update available',
      }, response => {
        if (response === 0) {
          electron.autoUpdater.quitAndInstall();
        }
      });
    },
  );

  electron.autoUpdater.setFeedURL(AUTO_UPDATE_URL);
  electron.autoUpdater.checkForUpdates();
}

module.exports = {
  initAutoUpdate,
};
