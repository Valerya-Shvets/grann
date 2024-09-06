import api from "../../api/axios";
import { setCartProduct } from "./cartActions";

export const SET_ORDER = "SET_ORDER";

export const setOrder = (order) => ({
  type: SET_ORDER,
  payload: order,
});

export const sendOrder = (order) => async (dispatch, getState) => {
  api.post("api/order", order).then(dispatch(setCartProduct([])));
};
