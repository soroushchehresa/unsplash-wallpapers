// @flow

import { all } from 'redux-saga/effects';
import Home from 'app/containers/Home/saga';

export default function* () {
  yield all([
    Home(),
  ]);
}
