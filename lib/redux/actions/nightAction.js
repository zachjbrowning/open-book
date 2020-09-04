import * as types from "../types";
import React from 'react';
import { Night } from '../../utils/localstorage';
import regeneratorRuntime from "regenerator-runtime";

export const toggle_night = () => async dispatch => {
    dispatch({
        type : types.NIGHT_TOGGLE,
    })
}


export const set_night = bool => async dispatch => {
    if (bool) {
        root.style.setProperty("--background", "#333333");
        root.style.setProperty("--background-accent", "#222222");
        root.style.setProperty("--text", "#DDDDDD");

    } else {
        root.style.setProperty("--background", "#FFFFFF");
        root.style.setProperty("--background-accent", "#EDEDED");
        root.style.setProperty("--text", "#222222");
    }
    Night.setNight(bool);
    dispatch({
        type : types.SET_NIGHT,
        bool : bool,
    })
}