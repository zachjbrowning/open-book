import React, { useEffect } from 'react';
import styles from './Notebooks.module.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import { set_notebook } from '../../../lib/redux/actions/activeAction';
import { new_coll, del_coll } from '../../../lib/redux/actions/collectionAction';

export default function Notebooks() {
    const dispatch = useDispatch();
    const collection = useSelector(state => state.collection);

    const delNotebook = (title) => {
        dispatch(del_coll(title));
    }

    const addNotebook = () => {
        dispatch(new_coll("WABOOM"));
    }
    
    const name = "Zachary"
    
    return <>
        <div className={styles.welcome}>
            <h1>Welcome, <span>{name}</span>!!</h1>        
        </div>
        <div className={styles.collections}>
            <h3>Your collections</h3>
            <div >
                {
                    Object.keys(collection).map((val, idx) => (
                        <div key={idx} className={`${idx % 2 === 1 ? styles.colored : ""} ${styles.notebook} `}>
                            <Link onClick={() => dispatch(set_notebook(val))} to={`/notebooks/${val.toLowerCase().replace(" ", "-")}`}>
                                {val}
                            </Link>
                            
                            <p onClick={() => delNotebook(val)}>delete</p>
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
