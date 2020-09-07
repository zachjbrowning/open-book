import { combineReducers } from 'redux';

import { authReducer } from "./authReducer";
import { collectionReducer } from "./collectionReducer";
import { activeReducer } from "./activeReducer";
import { queryReducer } from "./queryReducer";
import { nightReducer } from "./nightReducer";
import { modalReducer } from "./modalReducer";

//Join al the different state elements into a single object
export default combineReducers({
    auth : authReducer,
    collection : collectionReducer,
    active : activeReducer,
    query : queryReducer,
    night : nightReducer,
    modal : modalReducer,
})