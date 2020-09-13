import * as types from '../types';
import regeneratorRUntime from 'regenerator-runtime';

/*
    ACTIONS AND THEIR RELATED DISPATCH TYPES:
    (types found in ../types.js)
    - set_modal : SET_MODAL
    - unset_modal : UNSET_MODAL
    - set_warning : SET_WARN_MODAL
    - unset_warning : UNSET_WARN_MODAL

    for more information on state management refer to the frontend documentation (Frontend.md)
*/

// set all the info in the modal 
export const set_modal = (title, content, func, warning, buttons) => async dispatch => {
    dispatch({
        type : types.SET_MODAL,
        title : title,
        content : content,
        func : func,
        warning : warning,
        buttons : buttons,
    })
}

// remove the modal 
export const unset_modal = () => async dispatch => {
    dispatch({
        type : types.UNSET_MODAL,
    })
}

// set the warning in the modal
export const set_warning = warning => async dispatch => {
    dispatch({
        type : types.SET_WARN_MODAL,
        warning : warning,
    })
}

// remove the warning from the modal
export const unset_warning = () => async dispatch => {
    dispatch({
        type : types.UNSET_WARN_MODAL,
    })
}