import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import Main from './containers/Main';
import History from './containers/History';
import Settings from './containers/Settings';

export default () => (
  <App>
    <Switch>
      <Route path="/" component={Main} exact />
      <Route path="/history" component={History} />
      <Route path="/settings" component={Settings} />
    </Switch>
  </App>
);
