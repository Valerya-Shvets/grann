import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import productsReducer from "./reducers/productsRedusers";
import clientsReducer from "./reducers/clientsReducers";
import cartReducers from "./reducers/cartReducers";
import userReducer from "./reducers/userReducers";
import adminReducers from "./reducers/adminReducers";
import chefReducers from "./reducers/chefsReducers";
import photoReducer from "./reducers/photoReducers";
import orderReducers from "./reducers/orderReducers";

const rootReducer = combineReducers({
  product: productsReducer,
  client: clientsReducer,
  cart: cartReducers,
  user: userReducer,
  admin: adminReducers,
  chef: chefReducers,
  photo: photoReducer,
  order: orderReducers,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
