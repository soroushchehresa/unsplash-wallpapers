// @flow

import { fromJS } from 'immutable';
import type { fromJS as fromJSType } from 'immutable';

type InitialState = {
  updateWallpaperDate : string,
  updateWallpaperSchedule : string,
};

export const SET_UPDATE_WALLPAPER_SCHEDULE = 'unsplash-wallpapers/Settings/SET_UPDATE_WALLPAPER_SCHEDULE';
export const SET_UPDATE_WALLPAPER_TIME = 'unsplash-wallpapers/Settings/SET_UPDATE_WALLPAPER_TIME';

const initialState : fromJSType<InitialState> = fromJS({
  updateWallpaperDate: '',
  updateWallpaperSchedule: 'Manually',
});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_UPDATE_WALLPAPER_SCHEDULE:
      return state.set('updateWallpaperSchedule', action.data);
    case SET_UPDATE_WALLPAPER_TIME:
      return state.set('updateWallpaperDate', action.data);
    default:
      return state;
  }
};

export const setUpdateWallpaperSchedule = (data : string) => (
  dispatch => dispatch({ type: SET_UPDATE_WALLPAPER_SCHEDULE, data })
);
export const setUpdateWallpaperTime = (data : string) => (
  dispatch => dispatch({ type: SET_UPDATE_WALLPAPER_TIME, data })
);
