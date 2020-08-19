import * as types from '../types';
import regeneratorRuntime from "regenerator-runtime";

export const load_note = title => async dispatch => {

    const note = {
        title : "example",
        keywords : ["example"],
        notes : "Harry you're a wizard\nnew line here"
    }

    dispatch({
        type : types.LOAD_NOTE,
        note : note,
    })
}

export const clear_note = () => async dispatch => {
    dispatch({
        type : types.CLEAR_NOTE
    })
}