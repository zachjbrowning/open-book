import * as types from "../types";

// starting state of the component
const initialState = {
    queryString : "",
    results : [],
    searched : false,
}

/*
    Each case in the reducer refers to a different dispatch type,
    specified in ../types.js

    For more information on state management read the frontend documentation (found
    in Frontend.md)
*/


export const queryReducer = (state = initialState, action ) => {
    switch (action.type) {
        case types.UPDATE_QUERY:
            return { 
                queryString : action.query,
                results : action.results
            }
        case types.CLEAR_QUERY:
            return {
                ...initialState
            }
        case types.SEARCH_QUERY:
            return {
                queryString : "",
                results : action.results,
                searched : true,
            }
        default:
            return state
    }
}