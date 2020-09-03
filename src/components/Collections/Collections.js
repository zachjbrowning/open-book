import React, { useState } from 'react';
import styles from './Collections.module.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import { set_notebook } from '../../../lib/redux/actions/activeAction';
import { new_coll, del_coll } from '../../../lib/redux/actions/collectionAction';
import { set_modal, set_warning } from '../../../lib/redux/actions/modalAction';


export default function Notebooks() {
    const dispatch = useDispatch();
    const collection = useSelector(state => state.collection);
    const auth = useSelector(state => state.auth);


    const delNotebook = (id, title) => {
        dispatch(set_modal(
            "Are you sure?", 
            "Are you sure you want to delete this collection? This action cannot be reverted.",
            () => {
                dispatch(del_coll(id, title));
                return true;
            }, 
            false))
    }

    

    const addNotebook = () => {
        dispatch(set_modal(
            "Create collection",
            <>
                <div className="field">
                    <div className="control">
                        <input className="input" id="new-col-title" placeholder="title..." />
                    </div>
                </div>
            </>,
            () => {
                let input = document.getElementById("new-col-title");
                
                if (input.value in collection) {
                    dispatch(set_warning("That collection already exists. Please use a new name."));
                    input.value = ""
                    return false;
                } else if (!input.value.match(/^[0-9a-zA-Z ]+$/)) {
                    dispatch(set_warning("Please make sure your collection name consists only of letters, numbers and spaces."));
                    input.value = ""
                } else {
                    dispatch(new_coll(input.value));
                    return true;
                }
            },
            false
        ));
    }
    
    
    
    return <>
        <div className={styles.welcome}>
            <h1>Welcome, <span>{auth.first_name}</span>!!</h1>        
        </div>
        <div className={styles.collections}>
            <h3>Your collections</h3>
            <div >
                {
                    Object.keys(collection).map((val, idx) => (
                        <div key={idx} className={`${idx % 2 === 0 ? styles.colored : ""} ${styles.notebook} `}>
                            <Link onClick={() => dispatch(set_notebook(val, collection[val].id))} to={`/collections/${val.replace(/ /g, "-")}/`}>
                                {val}
                            </Link>
                            
                            <p onClick={() => delNotebook(collection[val].id, val)}>delete</p>
                        </div>
                    ))
                }
                <div onClick={addNotebook} className={styles.add}>
                    +<span>&nbsp;Add</span>
                </div>
            </div>
            
        </div>
        
    </>

}
