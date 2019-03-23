// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
import Routes from '../Routes';

type Props = {
  store : any,
  history : {}
};

export default ({ store, history } : Props) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>
);
