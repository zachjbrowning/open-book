import * as types from "../types";
import { bindActionCreators } from "redux";

const initialState = {
    "COMP3511" : false,
}


export const collectionReducer = (state = initialState, action ) => {
    switch (action.type) {
        case types.LOAD_NOTEBOOK:
            return {
                ...action.collection,
            }
        default:
            return state
    }
}
