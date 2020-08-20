import * as types from '../types';
import regeneratorRuntime from "regenerator-runtime";
import store from '../store';

export const load_note = title => async dispatch => {
    const note = store.getState().notebook[title]

    dispatch({
        type : types.LOAD_NOTE,
        note : {
            ...note,
            title : title,
        },
    })
}

export const clear_note = () => async dispatch => {
    dispatch({
        type : types.CLEAR_NOTE
    })
}