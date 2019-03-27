// @flow
import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router';
import Home from 'app/containers/Home/redux';
import Settings from 'app/containers/Settings/redux';

export default (history : History) => combineReducers({
  router: connectRouter(history),
  Home,
  Settings,
});
