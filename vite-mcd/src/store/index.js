import { applyMiddleware, legacy_createStore as createStore } from "redux";
import rootReducer from "./reducer";
import thunk from "redux-thunk";

// Salah satu konsep functional programming => Currying Function
// const logger = (store) => (next) => (action) => {
//   console.log("dispatching", action);
//   let result = next(action);
//   console.log("next state", store.getState());
//   return result;
// };

function logger(store) {
  return function firstInner(next) {
    return function secondInner(action) {
     
      let result = next(action);
      
      return result;
    };
  };
}



const store = createStore(rootReducer, applyMiddleware(logger, thunk));

export default store;
