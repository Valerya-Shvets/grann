export const ADD_CART_PRODUCT = "ADD_CART_PRODUCT";
export const SET_CART_PRODUCT = "SET_CART_PRODUCT";
export const DELETE_CART_PRODUCT = "DELETE_CART_PRODUCT";

export const addCartProduct = (cartProduct) => ({
  type: ADD_CART_PRODUCT,
  payload: cartProduct,
});

export const setCartProduct = (cartProducts) => ({
  type: SET_CART_PRODUCT,
  payload: cartProducts,
});

export const deleteCartProduct = (id) => ({
  type: DELETE_CART_PRODUCT,
  payload: id,
});
