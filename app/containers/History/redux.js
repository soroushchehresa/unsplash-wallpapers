import { fromJS } from 'immutable';

const GET_PHOTO = 'unsplash-wallpapers/Main/GET_PHOTO';
const GET_PHOTO_SUCCESS = 'unsplash-wallpapers/Main/GET_PHOTO_SUCCESS';
const GET_PHOTO_FAIL = 'unsplash-wallpapers/Main/GET_PHOTO_FAIL';

const initialState = fromJS({
  getPhotoLoading: false,
  photoData: {},
  getPhotoFail: null
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
    default:
      return state;
  }
};

export const getPhoto = () => (dispatch, getState, api) => {
  dispatch({ type: GET_PHOTO });
  api.get('photos/random?collections=1065396')
    .then((response) => dispatch({ type: GET_PHOTO_SUCCESS, data: response }))
    .catch((error) => dispatch({ type: GET_PHOTO_FAIL, data: error }));
};
