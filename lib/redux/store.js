import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducers";
import { apply } from "file-loader";

const initialState = {};
const middleware = [thunk];


const constructMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...middleware));
  } else return applyMiddleware(...middleware);
}

const store = createStore(
  rootReducer,
  initialState,
  constructMiddleware(middleware)
);
export default store;