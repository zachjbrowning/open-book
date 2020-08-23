import * as types from "../types";
import regeneratorRuntime from "regenerator-runtime";
import store from '../store';

export const update_query = query => async dispatch => {
    if (query === "") {
        dispatch({
            type : types.UPDATE_QUERY,
            query : query,
            results : [],
        })
        return;
    }
    query = query.toLowerCase();
    const notebook = store.getState().notebook;
    const iterable = Object.keys(notebook).sort();
    let match = []
    for (var note of iterable) {
        if (note.indexOf(query) !== -1) match.push(note);
    }
    for (note of iterable) {
        if (note.indexOf(query) === -1) {
            for (var key of notebook[note].keywords) {
                if (key.indexOf(query) !== -1) {
                    match.push(note);
                    break;
                }
            }
        }
    }
    
    dispatch({
        type : types.UPDATE_QUERY,
        query : query,
        results : match.slice(0,10),
    })
}


export const clear_query = () => async dispatch => {
    dispatch({
        type : types.CLEAR_QUERY
    })
}