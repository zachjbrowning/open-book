import { combineReducers } from 'redux';

import { queryReducer } from "./queryReducer";
import { nightReducer } from "./nightReducer";
import { collectionReducer } from "./collectionReducer";
import { activeReducer } from "./activeReducer";

export default combineReducers({
    query : queryReducer,
    active : activeReducer,
    collection : collectionReducer,
    night : nightReducer,
})