import {
  SET_BESTSELLERS,
  SET_CATALOG_PRODUCTS,
  SET_PRODUCT,
  SET_PRODUCT_INGREDIENTS,
  SET_PRODUCT_DECOR,
  SET_PRODUCT_TYPES,
  SET_PRODUCT_WEIGHT,
  DELETE_PRODUCT_INGREDIENT,
  DELETE_PRODUCT_TYPE,
  DELETE_PRODUCT_DECOR,
  DELETE_PRODUCT_WEIGHT,
} from "../actions/productsActions";

const initialState = {
  bestsellsers: [],
  products: [],
  ingredients: [],
  decor: [],
  types: [],
  weight: [],
  product: {},
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BESTSELLERS:
      return {
        ...state,
        bestsellers: action.payload,
      };
    case SET_CATALOG_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case SET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    case SET_PRODUCT_INGREDIENTS:
      return {
        ...state,
        ingredients: state.ingredients.some(
          (item) => item.id === action.payload.id
        )
          ? state.ingredients.map((item) =>
              item.id === action.payload.id
                ? { ...item, value: action.payload.value }
                : item
            )
          : [...state.ingredients, action.payload],
      };
    case SET_PRODUCT_DECOR:
      return {
        ...state,
        decor: state.decor.some((item) => item.id === action.payload.id)
          ? state.decor.map((item) =>
              item.id === action.payload.id
                ? {
                    ...item,
                    value: action.payload.value,
                    price: action.payload.price,
                  }
                : item
            )
          : [...state.decor, action.payload],
      };
    case SET_PRODUCT_TYPES:
      return {
        ...state,
        types: state.types.some((item) => item.id === action.payload.id)
          ? state.types.map((item) =>
              item.id === action.payload.id
                ? {
                    ...item,
                    value: action.payload.value,
                    price: action.payload.price,
                  }
                : item
            )
          : [...state.types, action.payload],
      };
    case SET_PRODUCT_WEIGHT:
      return {
        ...state,
        weight: state.weight.some((item) => item.id === action.payload.id)
          ? state.weight.map((item) =>
              item.id === action.payload.id
                ? {
                    ...item,
                    value: action.payload.value,
                    price: action.payload.price,
                  }
                : item
            )
          : [...state.weight, action.payload],
      };
    case DELETE_PRODUCT_INGREDIENT:
      return {
        ...state,
        ingredients: [
          state.ingredients.filter((item) => item.id !== action.payload),
        ],
      };
    case DELETE_PRODUCT_DECOR:
      return {
        ...state,
        decor: [state.decor.filter((item) => item.id !== action.payload)],
      };
    case DELETE_PRODUCT_TYPE:
      return {
        ...state,
        types: [state.types.filter((item) => item.id !== action.payload)],
      };
    case DELETE_PRODUCT_WEIGHT:
      return {
        ...state,
        weight: [state.weight.filter((item) => item.id !== action.payload)],
      };
    default:
      return state;
  }
};

export default productsReducer;
