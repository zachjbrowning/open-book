import * as types from "../types";

// starting state of the component
const initialState = false;

/*
    Each case in the reducer refers to a different dispatch type,
    specified in ../types.js

    For more information on state management read the frontend documentation (found
    in Frontend.md)
*/


export const nightReducer = (state = initialState, action ) => {
    switch (action.type) {
        case types.NIGHT_TOGGLE:
            return !state
        case types.SET_NIGHT:
            return action.bool
        default:
            return state
    }
}