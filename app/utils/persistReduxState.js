// @flow

import * as Promise from 'bluebird';
import electronJsonStorage from 'electron-json-storage';
import isEqual from 'lodash/isEqual';

const storage = Promise.promisifyAll(electronJsonStorage);

export default (store) => {
  const reduxState = (store.getState()).toJS();
  storage.get('redux', (error, data) => {
    if (!isEqual(data, reduxState)) {
      const { Settings, Categories, Home } = reduxState;
      storage.set('redux', {
        Settings,
        Categories,
        Home: {
          photoData: Home.photoData,
        },
      });
    }
  });
};
