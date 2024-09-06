import api from "../../api/axios";

export const SET_CHEF_ORDERS = "SET_CHEF_ORDERS";
export const GET_ORDER = "GET_ORDER";
export const GET_ORDER_BY_ID = "GET_ORDER_BY_ID";

export const setChefOrders = (orders) => ({
  type: SET_CHEF_ORDERS,
  payload: orders,
});

export const getOrder = (orderId) => ({
  type: GET_ORDER,
  payload: orderId,
});

export const getOrderById = (orderId) => ({
  type: GET_ORDER_BY_ID,
  payload: orderId,
});

export const getChefOrders = () => async (dispatch, getState) => {
  api
    .get("api/order/product")
    .then((response) => dispatch(setChefOrders(response.data)))
    .catch((error) => console.log("error: ", error));
};

export const acceptOrder = (id) => async (dispatch, getState) => {
  api.put(`api/order/product/${id}/take`);
};

export const finishOrder = (id) => async (dispatch, getState) => {
  api.put(`api/order/product/${id}/finish`);
};
