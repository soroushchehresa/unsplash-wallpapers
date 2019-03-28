// @flow

import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import History from './containers/History';
import Settings from './containers/Settings';
import Categories from './containers/Categories';

export default () => (
  <App>
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/history" component={History} />
      <Route path="/settings" component={Settings} />
      <Route path="/categories" component={Categories} />
    </Switch>
  </App>
);
