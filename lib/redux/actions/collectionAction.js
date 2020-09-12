import * as types from '../types';
import regeneratorRuntime from "regenerator-runtime";
import NoteAPI from '../../api/note';
import CollectionAPI from '../../api/collection';

/*
    ACTIONS AND THEIR RELATED DISPATCH TYPES:
    (types found in ../types.js)
    - load_all : LOAD_ALL
    - load_collection : LOAD_COLLECTION
    - new_coll : NEW_COLLECTION
    - del_coll : DEL_COLLECTION
    - new_note : NEW_NOTE_COLLECTION
    - del_note : DEL_NOTE_COLLECTION
    - edit_note : EDIT_NOTE_COLLECTION
    - new_cat_collection : NEW_CAT_COLLECTION
    - del_cat_collection : DEL_CAT_COLLECTION

    for more information on state management refer to the frontend documentation (Frontend.md)
*/

// Load the overview of a user's collections
export const load_all = () => async dispatch => {
    CollectionAPI.get()
    .then(res => {
        dispatch({
            type : types.LOAD_ALL,
            collections : res.data,
        })
        return true;
    })
    .catch(err => {
        return false;

    })
} 

//load an individual collection 
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

//create a new collection
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

//delete an existing collection
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

//creates a new note
export const new_note = (notebook, notebook_id, title, keywords, notes) => async dispatch => {
    NoteAPI.create(title, notebook_id, notes, keywords)
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

//deletes an existing note
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

//edits an existing note
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

//adds a category to an existing note
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

//removes a category from an existing note
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