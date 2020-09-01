import * as types from '../types';
import regeneratorRuntime from "regenerator-runtime";
import store from '../store';
import NotebookAPI from '../../api/notebook';
import CollectionAPI from '../../api/collection';

export const load_collection = () => async dispatch => {
    CollectionAPI.get()
    .then(res => {
        dispatch({
            type : types.LOAD_COLLECTION,
            collection : res.data,
        })
    })
    .catch(err => {
        console.log(err);
    })
} 

//NEEDS API
export const new_coll = title => async dispatch => {
    dispatch({
        type : types.NEW_COLLECTION,
        title : title,
    })
}

//NEEDS API
export const del_coll = title => async dispatch => {
    dispatch({
        type : types.DEL_COLLECTION,
        title : title,
    })
}

//NEEDS API
//Assumes valid name checking is already done
export const new_note = (notebook, title, note) => async dispatch => {
    dispatch({
        type : types.NEW_NOTE_COLLECTION,
        notebook : notebook,
        title : title,
        note : note,
    })
}

//NEEDS API
export const del_note = (notebook, title) => async dispatch => {
    dispatch({
        type : types.DEL_NOTE_COLLECTION,
        notebook : notebook,
        title : title,
    })
}

//NEEDS API
export const edit_note = (oldTitle, notebook, title, note) => async dispatch => {
    dispatch({
        type : types.EDIT_NOTE_COLLECTION,
        oldTitle : oldTitle,
        notebook : notebook,
        title : title,
        note : note,
    })
}

//NEEDS API
export const new_cat_collection = (notebook, title, cat) => async dispatch => {
    dispatch({
        type : types.NEW_CAT_COLLECTION,
        notebook : notebook,
        title : title,
        cat : cat,
    })
}

//NEEDS API
export const del_cat_collection = (notebook, title, cat) => async dispatch => {
    dispatch({
        type : types.DEL_CAT_COLLECTION,
        notebook : notebook,
        title : title,
        cat : cat,
    })
}