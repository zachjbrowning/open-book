import * as types from "../types";
import regeneratorRuntime from "regenerator-runtime";
import { unset_note } from './activeAction';
import store from '../store';

/*
    ACTIONS AND THEIR RELATED DISPATCH TYPES:
    (types found in ../types.js)
    - update_query : UPDATE_QUERY
    - clear_query : CLEAR_QUERY
    - search_query : SEARCH_QUERY

    for more information on state management refer to the frontend documentation (Frontend.md)
*/

// updates the current query. Gets the query results from 
// the current active notebook
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

// clears the query
export const clear_query = () => async dispatch => {
    dispatch({
        type : types.CLEAR_QUERY
    })
}


// searches the current active query. Different to update_query
// as it searches through the notes themselves rather than just the title
// and keywords.
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
    dispatch(unset_note());
    let results = []
    query = query.toLowerCase();
    const dict = store.getState().collection[bookname].notes;
    for (var n of Object.keys(dict)) {
        let index = dict[n].notes.toLowerCase().indexOf(query.toLowerCase());
        if (index !== -1) {
            results.push({
                title : n,
                words : [`...${dict[n].notes.slice(index - 50 < 0 ? 0 : index - 50, index)}`, dict[n].notes.slice(index, index + query.length), `${dict[n].notes.slice(index + query.length, index + query.length + 50)}...`]
            })
        }

        
    }

    dispatch({
        type : types.SEARCH_QUERY,
        results : results,
    })
}

