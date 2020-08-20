import * as types from '../types';
import regeneratorRuntime from "regenerator-runtime";
import store from '../store';

export const load_notebook = () => async dispatch => {
    //NEEDS API!!!!!

    const retrieved = {
        "first" : {
            keywords : ["maths", "science"],
            notes : "sup homyg"
        },
        "complex numbers" : {
            keywords : ["maths", "spec b"],
            notes : "easy as i"
        },
        "trigonometry" : {
            keywords : ["triangles", "maths"],
            notes : "180 bby"
        }
    }

    dispatch({
        type : types.LOAD_NOTEBOOK,
        notebook : retrieved,
    })
}

export const remove_note = title => async dispatch => {
    dispatch({
        type : types.REMOVE_NOTEBOOK,
        title : title,
    })
}

export const update_note = () => async dispatch => {
    const note = store.getState().note;

    dispatch({
        type : types.ADD_NOTEBOOK,
        title : note.title,
        note : {
            keywords : note.keywords,
            notes : note.notes
        }
    })
}

export const add_notebook = () => async dispatch => {
    const note = store.getState().note;

    dispatch({
        type : types.ADD_NOTEBOOK,
        title : note.title,
        note : {
            keywords : note.keywords,
            notes : note.notes
        }
    })
}


