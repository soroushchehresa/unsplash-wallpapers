// @flow

import { fromJS } from 'immutable';
import type { fromJS as fromJSType } from 'immutable';

type InitialState = {
  activeCategory : number,
}

export const SET_ACTIVE_CATEGORY : string = 'unsplash-wallpapers/Categories/SET_ACTIVE_CATEGORY';

const initialState : fromJSType<InitialState> = fromJS({
  activeCategory: '1065396',
});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_ACTIVE_CATEGORY:
      return state.set('activeCategory', action.data);
    default:
      return state;
  }
};

export const setActiveCategory = (data : number) => (
  dispatch => dispatch({ type: SET_ACTIVE_CATEGORY, data })
);
