// @flow

import React from 'react';
import storage from 'electron-json-storage';
import os from 'os';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import updateHandler from 'app/utils/updateHandler';
import Root from './containers/Root';
import { configureStore, history } from './redux/store/configureStore';

updateHandler();

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
