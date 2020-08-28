import * as types from '../types';
import regeneratorRUntime from 'regenerator-runtime';

export const set_modal = (title, content, func, warning) => async dispatch => {
    dispatch({
        type : types.SET_MODAL,
        title : title,
        content : content,
        func : func,
        warning : warning,
    })
}

export const unset_modal = () => async dispatch => {
    dispatch({
        type : types.UNSET_MODAL,
    })
}

export const set_warning = warning => async dispatch => {
    dispatch({
        type : types.SET_WARN_MODAL,
        warning : warning,
    })
}

export const unset_warning = () => async dispatch => {
    dispatch({
        type : types.UNSET_WARN_MODAL,
    })
}