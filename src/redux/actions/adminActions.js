import api from "../../api/axios";

export const SET_ADMIN_PRODUCTS = "SET_ADMIN_PRODUCTS";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

export const SET_ADMIN_CHEFS = "SET_ADMIN_CHEFS";
export const ADD_CHEF = "ADD_CHEF";
export const UPDATE_CHEF = "UPDATE_CHEF";
export const DELETE_CHEF = "DELETE_CHEF";

export const SET_ADMIN_ORDERS = "SET_ADMIN_ORDERS";

export const setAdminProducts = (productsList) => ({
  type: SET_ADMIN_PRODUCTS,
  payload: productsList,
});

export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: product,
});

export const updateProduct = (product) => ({
  type: UPDATE_PRODUCT,
  payload: product,
});

export const deleteProduct = (id) => ({
  type: DELETE_PRODUCT,
  payload: id,
});

export const setAdminChefs = (chefsList) => ({
  type: SET_ADMIN_CHEFS,
  payload: chefsList,
});

export const addChef = (chef) => ({
  type: ADD_CHEF,
  payload: chef,
});

export const updateChef = (chef) => ({
  type: UPDATE_CHEF,
  payload: chef,
});

export const deleteChef = (id) => ({
  type: DELETE_CHEF,
  payload: id,
});

export const setAdminOrders = (orders) => ({
  type: SET_ADMIN_ORDERS,
  payload: orders,
});

// DONE
export const getProductsList = () => async (dispatch, getState) => {
  api
    .get("api/product")
    .then((responce) => dispatch(setAdminProducts(responce.data)))
    .catch((error) => console.log("error: ", error));
};
// DONE
export const addCatalogProduct = (product) => async (dispatch, getState) => {
  api.post("api/product", {
    product: product,
  });
};

export const updateCatalogProduct = (product) => async (dispatch, getState) => {
  api.put("api/product", {
    product: product,
  });
};

// DONE
export const deleteCatalogProduct = (id) => async (dispatch, getState) => {
  api.delete(`api/product/${id}`);
};
// DONE
export const getChefsList = () => async (dispatch, getState) => {
  api
    .get("api/chef")
    .then((responce) => dispatch(setAdminChefs(responce.data)))
    .catch((error) => console.log("error: ", error));
};
// DONE
export const addAdminChef = (chef) => async (dispatch, getState) => {
  api.post("api/chef", {
    chef: chef,
  });
};

export const updateAdminChef = (chef) => async (dispatch, getState) => {
  api.put("api/chef", {
    chef: chef,
  });
};

// DONE
export const deleteAdminChef = (id) => async (dispatch, getState) => {
  api.delete(`api/chef/${id}`);
};

export const getAdminOrders = (orders) => async (dispatch, getState) => {
  api
    .get("api/order/product")
    .then((response) => dispatch(setAdminOrders(response.data)))
    .catch((error) => console.log("error: ", error));
};
