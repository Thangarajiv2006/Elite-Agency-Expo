import { combineReducers } from "redux";
import AgencyReducer from "./auth.reducer";
import shopReducer from "./shop.reducer";
import productReducer from "./product.reducer";
import orderReducer from "./order.reducer";

const rootReducer = combineReducers({
  Agency: AgencyReducer,
  shop: shopReducer,
  product: productReducer,
  order: orderReducer,
});

export default rootReducer;
