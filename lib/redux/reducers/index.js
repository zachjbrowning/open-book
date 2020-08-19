import { combineReducers } from 'redux';

import { spinnerReducer } from "./spinnerReducer";

export default combineReducers({
    spinner : spinnerReducer,
})