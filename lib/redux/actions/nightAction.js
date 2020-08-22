import * as types from "../types";
import regeneratorRuntime from "regenerator-runtime";

export const toggle_night = () => async dispatch => {
    dispatch({
        type : types.NIGHT_TOGGLE,
    })
}