import { combineReducers } from 'redux';

import { queryReducer } from "./queryReducer";
import { authReducer } from "./authReducer";
import { nightReducer } from "./nightReducer";
import { collectionReducer } from "./collectionReducer";
import { activeReducer } from "./activeReducer";
import { modalReducer } from "./modalReducer";

export default combineReducers({
    auth : authReducer,
    query : queryReducer,
    modal : modalReducer,
    active : activeReducer,
    collection : collectionReducer,
    night : nightReducer,
})