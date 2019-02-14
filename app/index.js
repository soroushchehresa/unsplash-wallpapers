import React from 'react';
import storage from 'electron-json-storage';
import os from 'os';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import 'font-awesome/css/font-awesome.min.css';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.css';

const store = configureStore();
storage.setDataPath(os.tmpdir());

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    // eslint-disable-next-line global-require
    const NextRoot = require('./containers/Root').default;
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
