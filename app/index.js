// @flow

import React from 'react';
import { render } from 'react-dom';
import storage from 'electron-json-storage';
import os from 'os';
import updateHandler from 'app/utils/updateHandler';
import Root from './containers/Root';
import { configureStore, history } from './redux/store/configureStore';

updateHandler();
storage.setDataPath(os.tmpdir());
configureStore()
  .then((store) => {
    render(
      <Root store={store} history={history} />,
      document.getElementById('root'),
    );
    if (module.hot) {
      module.hot.accept('./containers/Root', () => {
        // eslint-disable-next-line global-require
        const NextRoot = require('./containers/Root').default;
        render(
          <NextRoot store={store} history={history} />,
          document.getElementById('root'),
        );
      });
    }
  });
