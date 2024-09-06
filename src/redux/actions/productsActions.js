import api from "../../api/axios";

export const SET_BESTSELLERS = "SET_BESTSELLERS";
export const SET_CATALOG_PRODUCTS = "SET_CATALOG_PRODUCTS";
export const SET_PRODUCT = "SET_PRODUCT";
export const SET_PRODUCT_INGREDIENTS = "SET_PRODUCT_INGREDIENTS";
export const SET_PRODUCT_DECOR = "SET_PRODUCT_DECOR";
export const SET_PRODUCT_TYPES = "SET_PRODUCT_TYPES";
export const SET_PRODUCT_WEIGHT = "SET_PRODUCT_WEIGHT";
export const DELETE_PRODUCT_INGREDIENT = "DELETE_PRODUCT_INGREDIENT";
export const DELETE_PRODUCT_WEIGHT = "DELETE_PRODUCT_WEIGHT";
export const DELETE_PRODUCT_DECOR = "DELETE_PRODUCT_DECOR";
export const DELETE_PRODUCT_TYPE = "DELETE_PRODUCT_TYPE";

export const setBestsellers = (bestsellers) => ({
  type: SET_BESTSELLERS,
  payload: bestsellers,
});

export const setCatalogProducts = (products) => ({
  type: SET_CATALOG_PRODUCTS,
  payload: products,
});

export const setProduct = (product) => ({
  type: SET_PRODUCT,
  payload: product,
});

export const setProductIngredients = (ingredients) => ({
  type: SET_PRODUCT_INGREDIENTS,
  payload: ingredients,
});

export const setProductDecor = (decor) => ({
  type: SET_PRODUCT_DECOR,
  payload: decor,
});

export const setProductTypes = (types) => ({
  type: SET_PRODUCT_TYPES,
  payload: types,
});

export const setProductWeight = (weight) => ({
  type: SET_PRODUCT_WEIGHT,
  payload: weight,
});

export const deleteProductIngredient = (ingredient) => ({
  type: DELETE_PRODUCT_INGREDIENT,
  payload: ingredient,
});

export const deleteProductDecor = (decor) => ({
  type: DELETE_PRODUCT_DECOR,
  payload: decor,
});

export const deleteProductType = (type) => ({
  type: DELETE_PRODUCT_TYPE,
  payload: type,
});

export const deleteProductWeight = (weight) => ({
  type: DELETE_PRODUCT_WEIGHT,
  payload: weight,
});

export const getBestsellers = () => async (dispatch, getState) => {
  api
    .get("api/product/bestsellers")
    .then((response) => dispatch(setBestsellers(response.data)))
    .catch((error) => console.log("error: ", error));
};
// DONE
export const getCatalogProducts = () => async (dispatch, getState) => {
  api
    .get("api/product")
    .then((response) => dispatch(setCatalogProducts(response.data)))
    .catch((error) => console.log("error: ", error));
};

export const getProduct = (id) => async (dispatch, getState) => {
  api
    .get(`api/product/${id}`)
    .then((response) => {
      console.log("Response", response.data);
      dispatch(setProduct(response.data));
    })
    .catch((error) => console.log("error: ", error));
};
// DONE
export const createProduct = (product) => async (dispatch, getState) => {
  api.post("api/product", product);
  dispatch(setProductIngredients([]));
  dispatch(setProductDecor([]));
  dispatch(setProductTypes([]));
  dispatch(setProductWeight([]));
};
