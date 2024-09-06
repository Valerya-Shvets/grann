import { SET_EMAIL, SET_PASSWORD, SET_LINK } from "../actions/userActions";

const initialState = {
  email: "",
  password: "",
  link: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case SET_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
    case SET_LINK:
      return {
        ...state,
        link: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
