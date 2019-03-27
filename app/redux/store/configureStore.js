// @flow

import configureStoreDev from './configureStore.dev';
import configureStoreProd from './configureStore.prod';

export const { configureStore, history } = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;
