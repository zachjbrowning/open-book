import * as types from '../types';
import regeneratorRuntime from "regenerator-runtime";
import store from '../store';
import NotebookAPI from '../../api/notebook';

export const save_notebook = () => async dispatch => {
    const notebook = store.getState().notebook;
    NotebookAPI.commit(notebook);
}


export const load_notebook = () => async dispatch => {
    //NEEDS API!!!!!
    NotebookAPI.load()
    .then(res => {
        dispatch({
        type : types.LOAD_NOTEBOOK,
        notebook : res.data
    })})
    .catch(err => {
        console.log(err);
    })
}

export const remove_note = title => async dispatch => {
    dispatch({
        type : types.REMOVE_NOTEBOOK,
        title : title,
    })
}

export const update_note = (newTitle, newNotes) => async dispatch => {
    const note = store.getState().note;
    dispatch({
        type : types.UPDATE_NOTEBOOK,
        newTitle : newTitle,
        newNotes : newNotes,
        note : note,
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


