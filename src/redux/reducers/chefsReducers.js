import {
  GET_ORDER,
  SET_CHEF_ORDERS,
  GET_ORDER_BY_ID,
} from "../actions/chefsActions";

const initialState = {
  chefOrders: [],
  order: {},
};

const chefReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHEF_ORDERS:
      return {
        ...state,
        chefOrders: action.payload,
      };
    case GET_ORDER:
      return {
        ...state,
        chefOrders: state.chefOrders.map((order) => {
          if (order.id !== action.payload.id) {
            return order;
          }
          return {
            ...order,
            ...action.payload,
          };
        }),
      };
    case GET_ORDER_BY_ID:
      console.log("ChefOrder", state.chefOrders);
      const found = state.chefOrders.find((item) => {
        console.log("item id", item.id);
        return item.id === action.payload;
      });
      console.log("found", found);
      return {
        ...state,
        order: found,
      };
    default:
      return state;
  }
};

export default chefReducers;
