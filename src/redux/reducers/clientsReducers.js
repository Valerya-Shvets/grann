import { SET_ORDER } from "../actions/clientsActions";

const initialState = {
  order: {},
};

const clientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    default:
      return state;
  }
};

export default clientsReducer;
