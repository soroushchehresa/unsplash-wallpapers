// @Flow

import { fork, all, put, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios';
import storage from 'electron-json-storage';
import wallpaper from 'wallpaper';
import fs from 'fs';
import os from 'os';
import util from 'util';
import path from 'path';
import API from 'app/utils/xhr_wrapper';
import { GET_PHOTO, GET_PHOTO_SUCCESS, GET_PHOTO_FAIL, SET_WALLPAPER, SET_WALLPAPER_FAIL, SET_WALLPAPER_SUCCESS } from './redux';

function* getPhoto() {
  yield takeLatest(GET_PHOTO, function* () {
    const request = yield API.get('photos/random?collections=1065396');
    if (request.status === 200) {
      yield put({ type: GET_PHOTO_SUCCESS, data: request.data });
    } else {
      yield put({ type: GET_PHOTO_FAIL, data: request });
    }
  });
}

function* handleSetAndStoreWallpaper(picturePath : string, photoData : any, storedPictures : any, hasPicture : boolean) {
  yield setWallpaper = wallpaper.set(picturePath, { scale: 'stretch' });
  yield put({ type: SET_WALLPAPER_SUCCESS });
  if (!hasPicture) {
    storage.set('pictures', {
      list: [
        { ...photoData.toJS(), path: picturePath },
        ...((storedPictures.list && storedPictures.list.length > 0) ? storedPictures.list : [])
      ]
    });
  }
}

function* setWallpaper() {
  yield takeLatest(SET_WALLPAPER, function* () {
    const state = yield select();
    const photoData = state.getIn(['Main', 'photoData']);
    let hasPicture = false;
    let storedPictures = null;
    let picturePath = path.join(
      os.homedir(),
      '/Pictures',
      `unsplash-${photoData.get('id')}.png`
    );
    picturePath = path.normalize(picturePath);

    storage.get('pictures', (error, pictures) => {
      storedPictures = pictures;
      if (pictures.list && pictures.list.length > 0) {
        pictures.list.forEach(pictureItem => {
          if (pictureItem.id === photoData.get('id')) {
            hasPicture = true;
          }
        });
      }
    });

    if (hasPicture) {
      yield handleSetAndStoreWallpaper(picturePath, photoData, storedPictures, hasPicture);
    } else {
      let base64Image = yield axios
        .get(photoData.getIn(['urls', 'full']), {
          responseType: 'arraybuffer'
        });
      base64Image = new Buffer.from(
        base64Image.data,
        'binary'
      ).toString('base64');
      yield util.promisify(fs.writeFile)(picturePath, base64Image, 'base64');
      yield handleSetAndStoreWallpaper(picturePath, photoData, storedPictures, hasPicture);
    }
  });
}

export default function* () {
  yield all([
    fork(getPhoto),
    fork(setWallpaper)
  ]);
}
