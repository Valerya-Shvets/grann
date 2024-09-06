import {
  ADD_CART_PRODUCT,
  DELETE_CART_PRODUCT,
  SET_CART_PRODUCT,
} from "../actions/cartActions";

const initialState = {
  cartProducts: [],
};

const cartReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CART_PRODUCT:
      return {
        ...state,
        cartProducts: [...state.cartProducts, action.payload],
      };
    case SET_CART_PRODUCT:
      return {
        ...state,
        cartProducts: action.payload,
      };
    case DELETE_CART_PRODUCT:
      return {
        ...state,
        cartProducts: state.cartProducts.filter(
          (cartItem) => cartItem.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default cartReducers;
