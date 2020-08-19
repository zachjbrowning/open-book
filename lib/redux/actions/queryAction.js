import * as types from "../types";
import regeneratorRuntime from "regenerator-runtime";


export const update_query = query => async dispatch => {

    const match = [
        "one",
        "four",
        "five",
        "I give ya"
    ]

    dispatch({
        type : types.UPDATE_QUERY,
        query : query,
        results : match.slice(0, query.length)
    })
}


export const clear_query = () => async dispatch => {
    dispatch({
        type : types.CLEAR_QUERY
    })
}