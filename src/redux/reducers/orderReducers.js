import { ADD_ORDER_PRODUCT } from "../actions/orderActions";

const initialState = {
  orderProducts: [],
};

const orderReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER_PRODUCT:
      return {
        ...state,
        orderProducts: [...state.orderProducts, action.payload],
      };
    default:
      return state;
  }
};

export default orderReducers;
