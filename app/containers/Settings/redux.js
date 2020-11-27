// @flow

import { fromJS } from 'immutable';
import type { fromJS as fromJSType } from 'immutable';

export const SET_ACTIVE_THEME = 'unsplash-wallpapers/Settings/SET_ACTIVE_THEME';
export const SET_AUTOMATIC_CHANGE_ACTIVE_THEME = 'unsplash-wallpapers/Settings/SET_AUTOMATIC_CHANGE_ACTIVE_THEME';

type InitialState = {
  updateWallpaperDate : string,
  updateWallpaperSchedule : string,
  activeTheme : string,
  isChangeAutomaticActiveTheme : boolean,
};

const initialState : fromJSType<InitialState> = fromJS({
  activeTheme: 'Light',
  isChangeAutomaticActiveTheme: process.platform === 'darwin',
});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_ACTIVE_THEME:
      return state.set('activeTheme', action.data);
    case SET_AUTOMATIC_CHANGE_ACTIVE_THEME:
      return state.set('isChangeAutomaticActiveTheme', action.data);
    default:
      return state;
  }
};

export const setActiveTheme = (data : string) => (
  dispatch => dispatch({ type: SET_ACTIVE_THEME, data })
);

export const setAutomaticChangeActiveTheme = (data : string) => (
  dispatch => dispatch({ type: SET_AUTOMATIC_CHANGE_ACTIVE_THEME, data })
);
