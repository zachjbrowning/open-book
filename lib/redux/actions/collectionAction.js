import * as types from '../types';
import regeneratorRuntime from "regenerator-runtime";
import store from '../store';
import NoteAPI from '../../api/note';
import CollectionAPI from '../../api/collection';
import { bindActionCreators } from 'redux';

export const load_all = () => async dispatch => {
    CollectionAPI.get()
    .then(res => {
        dispatch({
            type : types.LOAD_ALL,
            collections : res.data,
        })
    })
    .catch(err => {
        console.log(err);
    })
} 

export const load_collection = (notebook, id) => async dispatch => {
    CollectionAPI.get_one(id)
    .then(res => {
        dispatch({
            type : types.LOAD_COLLECTION,
            collection : res.data,
            notebook : notebook,
        })
    })
    .catch(err => {
        console.log(err);
    })
}

//NEEDS API
export const new_coll = title => async dispatch => {
    CollectionAPI.create(title)
    .then(res => {
        dispatch({
            type : types.NEW_COLLECTION,
            collection : {
                [res.data.title] : {
                    id : res.data.id,
                    notes : false,
                }
            },
            
        })
    })
    .catch(err => {
        console.log(err);
    })
}

//NEEDS API
export const del_coll = (id, title) => async dispatch => {
    CollectionAPI.delete(id)
    .then(res => {
        dispatch({
            type : types.DEL_COLLECTION,
            title : title,
        })
    })
    .catch(err => {
        console.log(err);
    })
}

//NEEDS API
//Assumes valid name checking is already done
// POST to /note
export const new_note = (notebook, notebook_id, title, keywords, notes) => async dispatch => {
    NoteAPI.create(title, notebook_id, keywords, notes)
    .then(res => {
        dispatch({
            type : types.NEW_NOTE_COLLECTION,
            notebook : notebook,
            title : title,
            note : {
                keywords : res.data.keywords,
                id : res.data.id,
                notes : res.data.notes,
            },
        })
    })
    .catch(err => console.log(err))
}

//NEEDS API
// DELETE to /note/id
export const del_note = (notebook, note_id, title) => async dispatch => {
    NoteAPI.delete(note_id)
    .then(res => {
        dispatch({
            type : types.DEL_NOTE_COLLECTION,
            notebook : notebook,
            title : title,
        })
    })
    .catch(err => console.log(err))
}

//NEEDS API
// PATCH to /note/id
export const edit_note = (notebook, note_id, oldTitle, title, keywords, notes) => async dispatch => {
    NoteAPI.update(note_id, title, notes)
    .then(res => {
        dispatch({
            type : types.EDIT_NOTE_COLLECTION,
            oldTitle : oldTitle,
            notebook : notebook,
            title : title,
            note : {
                keywords : keywords,
                notes : notes,
            },
        })
    })
    .catch(err => console.log(err))
}

//NEEDS API
// POST to /keyword
export const new_cat_collection = (notebook, note_id, title, key) => async dispatch => {
    NoteAPI.add_cat(note_id, key)
    .then(res => {
        dispatch({
            type : types.NEW_CAT_COLLECTION,
            notebook : notebook,
            title : title,
            cat : key,
        })
    })
    .catch(err => console.log(err))
}

//NEEDS API
// PATCH to /keyword/(note id)
export const del_cat_collection = (notebook, note_id, title, key) => async dispatch => {
    NoteAPI.del_cat(note_id, key)
    .then(res => {
        dispatch({
            type : types.DEL_CAT_COLLECTION,
            notebook : notebook,
            title : title,
            cat : key,
        })
    })
    .catch(err => console.log(err))
}