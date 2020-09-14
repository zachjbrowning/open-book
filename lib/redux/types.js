// Action types assocaited with the 'auth' state element
export const LOGIN_AUTH = 'LOGIN_AUTH'; //logs in user
export const LOGOUT_AUTH = 'LOGOUT_AUTH'; //logs out user

// Action types assocaited with the 'collection' state element
export const LOAD_ALL = 'LOAD_ALL'; //loads all users collections
export const LOAD_COLLECTION = 'LOAD_COLLECTION'; //loads a single collection
export const NEW_COLLECTION = 'NEW_COLLECTION'; //creates a new collection
export const DEL_COLLECTION = 'DEL_COLLECTION'; //deletes a collection
export const EDIT_COLLECTION = 'EDIT_COLLECTION'; //renames a collection
export const NEW_NOTE_COLLECTION = 'NEW_NOTE_COLLECTION'; //adds a note to a specific collection
export const DEL_NOTE_COLLECTION = 'DEL_NOTE_COLLECTION'; //deletes a note from a collection
export const EDIT_NOTE_COLLECTION = 'EDIT_NOTE_COLLECTION'; //edits a note from a colleciton
export const NEW_CAT_COLLECTION = 'NEW_CAT_COLLECTION'; ///adds a cat to a note
export const DEL_CAT_COLLECTION = 'DEL_CAT_COLLECTION'; //deletes a cat from a note

// Action types assocaited with the 'active' state element
export const SET_BOOK_ACTIVE = 'SET_BOOK_ACTIVE'; //set a notebook as the active one
export const UNSET_BOOK_ACTIVE = 'UNSET_BOOK_ACTIVE'; //unset a notebook as the active one
export const SET_NOTE_ACTIVE = 'SET_NOTE_ACTIVE'; //set a note as the active one
export const UNSET_NOTE_ACTIVE = 'UNSET_NOTE_ACTIVE'; //unset a note as the active one
export const EDIT_NOTE_ACTIVE = 'EDIT_NOTE_ACTIVE'; //set a note to be edited
export const NEW_NOTE_ACTIVE = 'NEW_NOTE_ACTIVE'; //start a new note
export const NEW_CAT_ACTIVE = 'NEW_CAT_ACTIVE'; //add a new category to the new note
export const DEL_CAT_ACTIVE = 'DEL_CAT_ACTIVE'; //add a new category to the new note

// Action types assocaited with the 'query' state element
export const UPDATE_QUERY = 'UPDATE_QUERY'; // new key stroke, search for new ingredient
export const CLEAR_QUERY = 'CLEAR_QUERY'; // set query back to empty
export const SEARCH_QUERY = 'SEARCH_QUERY'; // search for results assocaited with query

// Action types assocaited with the 'night' state element
export const NIGHT_TOGGLE = 'NIGHT_TOGGLE'; //toggles night mode
export const SET_NIGHT = 'SET_NIGHT'; //toggles night mode

// Action types assocaited with the 'modal' state element
export const SET_MODAL = 'SET_MODAL'; //show modal and set it's content
export const UNSET_MODAL = 'UNSET_MODAL'; //clear and hide modal
export const SET_WARN_MODAL = 'SET_WARN_MODAL'; //set the WARN in the modal
export const UNSET_WARN_MODAL = 'UNSET_WARN_MODAL'; //unset WARN in the modal
