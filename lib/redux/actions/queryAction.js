import * as types from "../types";
import regeneratorRuntime from "regenerator-runtime";
import store from '../store';

export const update_query = query => async dispatch => {
    const bookname = store.getState().active.notebook;
    if (query === "" || !bookname) {
        dispatch({
            type : types.UPDATE_QUERY,
            query : query,
            results : [],
        })
        return;
    }
    query = query.toLowerCase();
    const notebook = store.getState().collection[bookname];
    const iterable = Object.keys(notebook.notes).sort();
    let match = []
    for (var note of iterable) {
        if (note.indexOf(query) !== -1) match.push(note);
    }
    for (note of iterable) {
        if (note.indexOf(query) === -1) {
            for (var key of notebook.notes[note].keywords) {
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

export const search_query = query => async dispatch => {
    const bookname = store.getState().active.notebook;
    if (query === "" || !bookname) {
        dispatch({
            type : types.UPDATE_QUERY,
            query : query,
            results : [],
        })
        return;
    }
    let results = []
    query = query.toLowerCase();
    const dict = store.getState().collection[bookname].notes;
    for (var n of Object.keys(dict)) {
        let index = dict[n].notes.toLowerCase().indexOf(query.toLowerCase());
        if (index !== -1) {
            results.push({
                title : n,
                words : `...${dict[n].notes.slice(index - 50 < 0 ? 0 : index - 50, index)}${dict[n].notes.slice(index, index + query.length).toUpperCase()}${dict[n].notes.slice(index + query.length, index + query.length + 50)}...`
            })
        }

        
    }

    dispatch({
        type : types.SEARCH_QUERY,
        results : results,
    })
}

