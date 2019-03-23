// @flow

import { fromJS } from 'immutable';
import type { fromJS as fromJSType } from 'immutable';

type InitialState = {
  updateSchedulePattern : string,
  updateScheduleMethod : string,
};

export const SET_UPDATE_SCHEDULE = 'unsplash-wallpapers/Settings/SET_UPDATE_SCHEDULE';

const initialState : fromJSType<InitialState> = fromJS({
  updateSchedulePattern: '',
  updateScheduleMethod: 'Daily',
});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_UPDATE_SCHEDULE:
      return state.merge({
        updateSchedulePattern: action.data.pattern,
        updateScheduleMethod: action.data.method,
      });
    default:
      return state;
  }
};

export const setUpdateSchedule = (data : string) => (
  dispatch => dispatch({ type: SET_UPDATE_SCHEDULE, data })
);
