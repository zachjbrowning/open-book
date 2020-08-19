import * as types from "../types";
import regeneratorRuntime from "regenerator-runtime";


export const spinner_toggle = () => async dispatch => {
    console.log("YEET")
    return dispatch({
        type:types.SPINNER_TOGGLE,
    })
}
