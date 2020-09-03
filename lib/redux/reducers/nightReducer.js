import * as types from "../types";

const initialState = false;


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