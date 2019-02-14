import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import Main from './containers/Main';
import History from './containers/History';

export default () => (
  <App>
    <Switch>
      <Route path="/" component={Main} exact />
      <Route path="/history" component={History} />
    </Switch>
  </App>
);
