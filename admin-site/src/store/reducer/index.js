import categoryReducer from "./category";
import foodReducer from "./food";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
  foods: foodReducer,
  category: categoryReducer,
});

export default rootReducer;
