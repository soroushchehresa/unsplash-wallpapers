// @flow

import React from 'react';
import storage from 'electron-json-storage';
import os from 'os';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { ipcRenderer, remote } from 'electron';
import Root from './containers/Root';
import { configureStore, history } from './redux/store/configureStore';

ipcRenderer.on('update-message', (event, message) => {
  if (message === 'Update downloaded') {
    if (confirm('Restart for update to the latest version')) {
      remote.app.relaunch();
      remote.app.exit(0);
    }
  }
});

storage.setDataPath(os.tmpdir());

configureStore()
  .then((store) => {
    render(
      <AppContainer>
        <Root store={store} history={history} />
      </AppContainer>,
      document.getElementById('root'),
    );
    if (module.hot) {
      module.hot.accept('./containers/Root', () => {
        // eslint-disable-next-line global-require
        const NextRoot = require('./containers/Root').default;
        render(
          <AppContainer>
            <NextRoot store={store} history={history} />
          </AppContainer>,
          document.getElementById('root'),
        );
      });
    }
  });
