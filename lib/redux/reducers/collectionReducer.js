import * as types from "../types";
import { bindActionCreators } from "redux";

const initialState = {}


export const collectionReducer = (state = initialState, action ) => {
    switch (action.type) {
        case types.LOAD_ALL:
            return {
                ...action.collections,
            }
        case types.LOAD_COLLECTION:
            return {
                ...state,
                [action.notebook] : {
                    ...state[action.notebook],
                    notes : action.collection.notes,
                }
            }
        case types.NEW_COLLECTION:
            return {
                ...state,
                ...action.collection,
            }
        case types.DEL_COLLECTION:
            let newState = state;
            delete state[action.title];
            return {
                ...newState,
            }
        case types.NEW_NOTE_COLLECTION:
            let newBook = state[action.notebook];
            newBook.notes[action.title] = action.note;
            return {
                ...state,
                [action.notebook] : newBook,
            }
        case types.DEL_NOTE_COLLECTION:
            newBook = state[action.notebook];
            delete newBook.notes[action.title];
            return {
                ...state,
                [action.notebook] : newBook,
            }
        case types.EDIT_NOTE_COLLECTION:
            newBook = state[action.notebook];
            if (action.oldTitle !== action.title) delete newBook.notes[action.oldTitle];
            newBook.notes[action.title] = action.note;
            return {
                ...state,
                [action.notebook] : newBook,
            }
        case types.NEW_CAT_COLLECTION:
            newBook = state[action.notebook];
            if (newBook.notes[action.title].keywords.indexOf(action.cat === -1)) newBook.notes[action.title].keywords.push(action.cat);
            return {
                ...state,
                [action.notebook] : newBook,
            }
        case types.DEL_CAT_COLLECTION:
            let keywords = state[action.notebook].notes[action.title].keywords;
            if (keywords.indexOf(action.cat) !== -1) keywords.splice(keywords.indexOf(action.cat), 1);
            return {
                ...state,
                [action.notebook] : {
                    ...state[action.notebook],
                    notes : {
                        ...state[action.notebook].notes,
                        [action.title] : {
                            ...state[action.notebook][action.title],
                            keywords : keywords,
                        }

                    },
                }
            }
        default:
            return state
    }
}
