import { SET_PHOTO, SET_PHOTO_ID } from "../actions/photoActions";

const initialState = {
  photoUrl: "",
  photoId: 0,
};

const photoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PHOTO:
      return {
        ...state,
        photoUrl: action.payload,
      };
    case SET_PHOTO_ID:
      return {
        ...state,
        photoId: action.payload,
      };
    default:
      return state;
  }
};

export default photoReducer;
