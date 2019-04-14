// @flow

import { ipcRenderer, remote } from 'electron';

export default () => {
  ipcRenderer.on('update-message', (event, message) => {
    if (message === 'Update downloaded') {
      if (confirm('Restart for update to the latest version')) {
        remote.app.relaunch();
        remote.app.exit(0);
      }
    }
  });
};
