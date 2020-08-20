import { combineReducers } from 'redux';

import { queryReducer } from "./queryReducer";
import { noteReducer } from "./noteReducer";
import { notebookReducer } from "./notebookReducer";

export default combineReducers({
    query : queryReducer,
    notebook : notebookReducer,
    note : noteReducer,
})