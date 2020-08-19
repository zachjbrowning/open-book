import { combineReducers } from 'redux';

import { queryReducer } from "./queryReducer";
import { noteReducer } from "./noteReducer";

export default combineReducers({
    query : queryReducer,
    note : noteReducer,
})