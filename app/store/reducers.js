// @flow
import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router';
import Main from 'app/containers/Main/redux';
import Settings from 'app/containers/Settings/redux';

export default (history : History) => combineReducers({
  router: connectRouter(history),
  Main,
  Settings,
});
