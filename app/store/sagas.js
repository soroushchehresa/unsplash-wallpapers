// @Flow

import { all } from 'redux-saga/effects';
import Main from 'app/containers/Main/saga';

export default function* () {
  yield all([
    Main()
  ]);
}
