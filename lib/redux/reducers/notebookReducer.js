import * as types from "../types";
import { bindActionCreators } from "redux";

const initialState = {
    "school" : {
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


export const notebookReducer = (state = initialState, action ) => {
    switch (action.type) {
        case types.LOAD_NOTEBOOK:
            return {
                ...action.notebook,
            }
        case types.REMOVE_NOTEBOOK:
            let temp = state;
            delete temp[action.title];
            return {
                ...temp,
            }
        case types.UPDATE_NOTEBOOK:
            temp = state;
            if (action.newTitle !== action.note.title) delete temp[action.note.title];
            return {
                ...temp,
                [action.newTitle] : {
                    keywords : action.note.keywords,
                    notes : action.newNotes,
                }
            }
        case types.ADD_NOTEBOOK:
            return {
                ...state,
                [action.title] : action.note,
            }
        default:
            return state
    }
}
