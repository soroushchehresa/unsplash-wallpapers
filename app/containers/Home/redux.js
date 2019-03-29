// @flow

import { fromJS } from 'immutable';
import type { fromJS as fromJSType } from 'immutable';

type InitialState = {
  getPhotoLoading : boolean,
  photoData : Object,
  getPhotoFail : Object | null,
  setWallpaperLoading : boolean,
}

export const GET_PHOTO : string = 'unsplash-wallpapers/Home/GET_PHOTO';
export const GET_PHOTO_SUCCESS : string = 'unsplash-wallpapers/Home/GET_PHOTO_SUCCESS';
export const GET_PHOTO_FAIL : string = 'unsplash-wallpapers/Home/GET_PHOTO_FAIL';
export const SET_PHOTO : string = 'unsplash-wallpapers/Home/SET_PHOTO';
export const SET_WALLPAPER : string = 'unsplash-wallpapers/Home/SET_WALLPAPER';
export const SET_WALLPAPER_SUCCESS : string = 'unsplash-wallpapers/Home/SET_WALLPAPER_SUCCESS';
export const SET_WALLPAPER_FAIL : string = 'unsplash-wallpapers/Home/SET_WALLPAPER_FAIL';

const initialState : fromJSType<InitialState> = fromJS({
  getPhotoLoading: false,
  photoData: {},
  getPhotoFail: null,
  setWallpaperLoading: false,
});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_PHOTO:
      return state.set('getPhotoLoading', true);
    case GET_PHOTO_SUCCESS:
      return state.merge({
        getPhotoLoading: false,
        photoData: fromJS(action.data),
      });
    case GET_PHOTO_FAIL:
      return state.merge({
        getPhotoLoading: false,
        getPhotoFail: fromJS(action.data),
      });
    case SET_PHOTO:
      return state.merge({
        photoData: fromJS(action.data),
      });
    case SET_WALLPAPER:
      return state.set('setWallpaperLoading', true);
    case SET_WALLPAPER_SUCCESS:
      return state.set('setWallpaperLoading', false);
    case SET_WALLPAPER_FAIL:
      return state.set('setWallpaperLoading', false);
    default:
      return state;
  }
};

export const getPhoto = (
  data : {
    setAutomaticWallpaper : boolean,
    activeCategory : number,
  } = {
    setAutomaticWallpaper: false,
  },
) => (
  dispatch => dispatch({ type: GET_PHOTO, data })
);
export const setPhoto = (data : Object) => dispatch => dispatch({ type: SET_PHOTO, data });
export const setWallpaper = () => dispatch => dispatch({ type: SET_WALLPAPER });
