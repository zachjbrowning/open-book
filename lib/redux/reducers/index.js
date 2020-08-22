import { combineReducers } from 'redux';

import { queryReducer } from "./queryReducer";
import { noteReducer } from "./noteReducer";
import { notebookReducer } from "./notebookReducer";
import { nightReducer } from "./nightReducer";

export default combineReducers({
    query : queryReducer,
    night : nightReducer,
    notebook : notebookReducer,
    note : noteReducer,
})