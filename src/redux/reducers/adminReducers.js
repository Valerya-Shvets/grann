import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  SET_ADMIN_PRODUCTS,
  UPDATE_PRODUCT,
  SET_ADMIN_CHEFS,
  ADD_CHEF,
  UPDATE_CHEF,
  DELETE_CHEF,
  SET_ADMIN_ORDERS,
} from "../actions/adminActions";

const initialState = {
  productsList: [],
  chefsList: [],
  ordersList: [],
};

const adminReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADMIN_PRODUCTS:
      return {
        ...state,
        productsList: action.payload,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        productsList: [...state.productsList, action.payload],
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        productsList: state.productsList.map((product) => {
          if (product.id !== action.payload.id) {
            return product;
          }
          return {
            ...product,
            ...action.payload,
          };
        }),
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        productsList: state.productsList.filter(
          (product) => product.id !== action.payload
        ),
      };
    case SET_ADMIN_CHEFS:
      return {
        ...state,
        chefsList: action.payload,
      };
    case ADD_CHEF:
      return {
        ...state,
        chefsList: [...state.chefsList, action.payload],
      };
    case UPDATE_CHEF:
      return {
        ...state,
        chefsList: state.chefsList.map((chef) => {
          if (chef.id !== action.payload.id) {
            return chef;
          }
          return {
            ...chef,
            ...action.payload,
          };
        }),
      };
    case DELETE_CHEF:
      return {
        ...state,
        chefsList: state.chefsList.filter((chef) => chef.id !== action.payload),
      };
    case SET_ADMIN_ORDERS:
      return {
        ...state,
        ordersList: action.payload,
      };
    default:
      return state;
  }
};

export default adminReducers;
