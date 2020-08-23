import * as types from '../types';
import regeneratorRuntime from "regenerator-runtime";
import store from '../store';
import NotebookAPI from '../../api/notebook';


export const load_collection = () => async dispatch => {
    NotebookAPI.load()
    .then(res => {
        dispatch({
            type : types.LOAD_COLLECTION,
            collection : res.data,
        });
    })
    .catch(err => {
        console.log(err);
    })
} 