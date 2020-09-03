import * as types from "../types";

const initialState = {
    queryString : "",
    //each one is an object with name and category
    results : [],
    searched : false,
}


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