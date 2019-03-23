import { fromJS } from 'immutable';

export const GET_PHOTO = 'unsplash-wallpapers/Main/GET_PHOTO';
export const GET_PHOTO_SUCCESS = 'unsplash-wallpapers/Main/GET_PHOTO_SUCCESS';
export const GET_PHOTO_FAIL = 'unsplash-wallpapers/Main/GET_PHOTO_FAIL';
export const SET_PHOTO = 'unsplash-wallpapers/Main/SET_PHOTO';
export const SET_WALLPAPER = 'unsplash-wallpapers/Main/SET_WALLPAPER';
export const SET_WALLPAPER_SUCCESS = 'unsplash-wallpapers/Main/SET_WALLPAPER_SUCCESS';
export const SET_WALLPAPER_FAIL = 'unsplash-wallpapers/Main/SET_WALLPAPER_FAIL';

const initialState = fromJS({
  getPhotoLoading: false,
  photoData: {},
  getPhotoFail: null,
  setWallpaperLoading: false
});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_PHOTO:
      return state.set('getPhotoLoading', true);
    case GET_PHOTO_SUCCESS:
      return state.merge({
        getPhotoLoading: false,
        photoData: fromJS(action.data)
      });
    case GET_PHOTO_FAIL:
      return state.merge({
        getPhotoLoading: false,
        getPhotoFail: fromJS(action.data)
      });
    case SET_PHOTO:
      return state.merge({
        photoData: fromJS(action.data)
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

export const getPhoto = () => (dispatch) => dispatch({ type: GET_PHOTO });
export const setPhoto = data => dispatch => dispatch({ type: SET_PHOTO, data });
export const setWallpaper = () => (dispatch) => dispatch({ type: SET_WALLPAPER });
