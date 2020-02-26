// @flow

import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loading from 'app/components/Loading';
import App from './containers/App';

const HomeComponent = lazy(() => import('./containers/Home'));
const HistoryComponent = lazy(() => import('./containers/History'));
const SettingsComponent = lazy(() => import('./containers/Settings'));
const CategoriesComponent = lazy(() => import('./containers/Categories'));

const LoadingComponent = () => (
  <div className="lazy-loading-wrapper">
    <Loading color="#bbb" size="22px" />
  </div>
);

const LazyHomeComponent = () => (
  <Suspense fallback={<LoadingComponent />}>
    <HomeComponent />
  </Suspense>
);

const LazyHistoryComponent = () => (
  <Suspense fallback={<LoadingComponent />}>
    <HistoryComponent />
  </Suspense>
);

const LazySettingsComponent = () => (
  <Suspense fallback={<LoadingComponent />}>
    <SettingsComponent />
  </Suspense>
);

const LazyCategoriesComponent = () => (
  <Suspense fallback={<LoadingComponent />}>
    <CategoriesComponent />
  </Suspense>
);

export default () => (
  <App>
    <Switch>
      <Route path="/" component={LazyHomeComponent} exact />
      <Route path="/history" component={LazyHistoryComponent} />
      <Route path="/settings" component={LazySettingsComponent} />
      <Route path="/categories" component={LazyCategoriesComponent} />
    </Switch>
  </App>
);
