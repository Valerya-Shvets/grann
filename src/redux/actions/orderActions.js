export const ADD_ORDER_PRODUCT = "ADD_ORDER_PRODUCT";

export const addOrderProduct = (product) => ({
  type: ADD_ORDER_PRODUCT,
  payload: product,
});
