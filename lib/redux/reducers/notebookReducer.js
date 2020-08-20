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
        case types.ADD_NOTEBOOK:
        case types.UPDATE_NOTEBOOK:
            return {
                ...state,
                [action.title] : action.note,
            }
        default:
            return state
    }
}
