// @flow

import React, { Fragment } from 'react';
import storage from 'electron-json-storage';
import { ThemeProvider } from 'styled-components';
import os from 'os';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './redux/store/configureStore';
import GlobalStyle from './globalStyles';

storage.setDataPath(os.tmpdir());

configureStore()
  .then((store) => {
    render(
      <AppContainer>
        <ThemeProvider theme={{}}>
          <Fragment>
            <Root store={store} history={history} />
            <GlobalStyle />
          </Fragment>
        </ThemeProvider>
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
