// @flow

import {
  fork,
  all,
  put,
  takeLatest,
  select,
  delay,
} from 'redux-saga/effects';
import axios from 'axios';
import storage from 'electron-json-storage';
import wallpaper from 'wallpaper';
import fs from 'fs';
import os from 'os';
import util from 'util';
import path from 'path';
import moment from 'moment';
import API from 'app/utils/xhrWrapper';
import { setUpdateWallpaperTime } from 'app/containers/Settings/redux';
import {
  GET_PHOTO,
  GET_PHOTO_SUCCESS,
  GET_PHOTO_FAIL,
  SET_WALLPAPER,
  SET_WALLPAPER_SUCCESS,
  SET_WALLPAPER_FAIL,
} from './redux';

function* getPhoto() {
  yield takeLatest(GET_PHOTO, function* cb(action) {
    // This is for limit of Unsplash API request per second!
    yield delay(800);
    const request = yield API.get(`photos/random?collections=${action.data.activeCategory}`);
    if (request && request.status === 200) {
      yield put({ type: GET_PHOTO_SUCCESS, data: request.data });
      if (action.data.setAutomaticWallpaper) {
        yield put({ type: SET_WALLPAPER });
      }
    } else {
      yield put({ type: GET_PHOTO_FAIL, data: request });
    }
  });
}

function* setWallpaper() {
  yield takeLatest(SET_WALLPAPER, function* cb() {
    if (window.navigator.onLine) {
      const reduxState = yield select();
      const photoData = reduxState.getIn(['Home', 'photoData']);
      let hasPicture = false;
      let storedPictures = null;
      let picturePath = path.join(
        os.homedir(),
        '/Pictures',
        `unsplash-${photoData.get('id')}.png`,
      );
      picturePath = path.normalize(picturePath);
      storage.get('pictures', (error, pictures) => {
        storedPictures = pictures;
        if (pictures.list && pictures.list.length > 0) {
          pictures.list.forEach((pictureItem) => {
            if (pictureItem.id === photoData.get('id')) {
              hasPicture = true;
            }
          });
        }
      });
      if (!hasPicture) {
        let base64Image = yield axios
          .get(photoData.getIn(['urls', 'full']), {
            responseType: 'arraybuffer',
          });
        if (base64Image && (base64Image.status === 200)) {
          base64Image = new Buffer.from(
            base64Image.data,
            'binary',
          ).toString('base64');
          yield util.promisify(fs.writeFile)(picturePath, base64Image, 'base64');
        } else {
          yield put({ type: SET_WALLPAPER_FAIL, data: base64Image });
          return;
        }
      }
      yield wallpaper.set(picturePath, { scale: 'auto' });
      yield put({ type: SET_WALLPAPER_SUCCESS });
      yield put(setUpdateWallpaperTime(moment()
        .format('DD.MM.YYYY HH:mm')));
      if (!hasPicture) {
        storage.set('pictures', {
          list: [
            { ...photoData.toJS(), path: picturePath },
            ...((storedPictures.list && storedPictures.list.length > 0) ? storedPictures.list : []),
          ],
        });
      }
    } else {
      yield put({ type: SET_WALLPAPER_FAIL, data: {} });
    }
  });
}

export default function* () {
  yield all([
    fork(getPhoto),
    fork(setWallpaper),
  ]);
}
