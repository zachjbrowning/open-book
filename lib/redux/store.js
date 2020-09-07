import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

//The seperate reducers are combined in ./reducers/index.js
import rootReducer from "./reducers";

const initialState = {};
const middleware = [thunk];

// Only use devtools when we are not in production mode!!
const constructMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...middleware));
  } else return applyMiddleware(...middleware);
}

// Create store to be used in webapp
const store = createStore(
  rootReducer,
  initialState,
  constructMiddleware(middleware)
);
export default store;