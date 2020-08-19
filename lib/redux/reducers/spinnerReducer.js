import * as types from "../types";


const initialState = false;


export const spinnerReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SPINNER_TOGGLE:
            return !state;
        default:
            return state;
    }
}