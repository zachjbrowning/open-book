import * as types from "../types";
import React from 'react';
import { Night } from '../../utils/localstorage';
import regeneratorRuntime from "regenerator-runtime";

/*
    ACTIONS AND THEIR RELATED DISPATCH TYPES:
    (types found in ../types.js)
    - set_night : SET_NIGHT

    for more information on state management refer to the frontend documentation (Frontend.md)
*/

// set the night mode state. Adjusts defined colours as well.
export const set_night = bool => async dispatch => {
    let root = document.getElementById("root");
    let html = document.getElementById("html");
    if (bool) {
        root.style.setProperty("--background", "#333333");
        root.style.setProperty("--background-accent", "#222222");
        root.style.setProperty("--text", "#DDDDDD");
        html.style.backgroundColor = "#333333";

    } else {
        root.style.setProperty("--background", "#FFFFFF");
        root.style.setProperty("--background-accent", "#EDEDED");
        root.style.setProperty("--text", "#222222");
        html.style.backgroundColor = "#FFFFFF";
    }
    Night.setNight(bool);
    dispatch({
        type : types.SET_NIGHT,
        bool : bool,
    })
}