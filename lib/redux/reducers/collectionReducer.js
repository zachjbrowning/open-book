import * as types from "../types";
import { bindActionCreators } from "redux";

const initialState = {"COMP3511" : {"usability goals":{"keywords":[],"notes":"- effective\n- efficient\n- safety \n- utility\n- learnability\n- memorability"},"user experience goals":{"keywords":[],"notes":"- a users emotions\n- positive : satisfying, fun, helpful, provocative, ...\n- negative : boring, offensive, gimmicky, patronising "},"design principles":{"keywords":[],"notes":"- visibility - how to use system\n- feedback - react to user input\n- constraints : \n  - physical - not viable physically\n  - semantic - related to context and making sense\n  - cultural - socially accepted, conventions\n  - logical - lack of ambiguity\n"},"mapping":{"keywords":[],"notes":"- relationship between controls and their interactions with regard to their placement"},"usability heuristics":{"keywords":["goals"],"notes":"- visibility of system status\n- user control and freedom\n- aesthetic and minimalist design\n- flexibility and efficiency of use\n- help and documentation\n- match between system and real world\n- error prevention\n- consistency and standards\n- recognition over recall\n- error recognition, diagnosis and recovery"},"affordance":{"keywords":[],"notes":"- gives strong clues on how it should be used\n- fundamental properties that imply use"},"ethics":{"keywords":["moral"],"notes":"- rules of conduct\n- rules and regulations\n- values\n- research\n- moral principles\n- ethical practices"},"consent form":{"keywords":["documentation","interview"],"notes":"- intro : describe study\n- body : \n  - description of recordings or observers\n  - data use\n  - contact\n- conclusion : signatures\n"},"product description statement":{"keywords":[],"notes":"30 words or less\ndescribe what the product will do to meet user goals"},"people / users / stakeholders":{"keywords":[],"notes":"primary - direct users\nsecondary - indirect users\ntertiary - other stakeholders"}}}


export const collectionReducer = (state = initialState, action ) => {
    switch (action.type) {
        case types.LOAD_COLLECTION:
            return {
                ...action.collection,
            }
        default:
            return state
    }
}
