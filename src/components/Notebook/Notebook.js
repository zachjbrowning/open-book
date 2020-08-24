import React from 'react';
import styles from './Notebook.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { set_note, new_note } from '../../../lib/redux/actions/activeAction';
import View from './View';
import Edit from './Edit';

export default function Notebook() {
    const dispatch = useDispatch();
    const { book } = useParams();
    const collection = useSelector(state => state.collection);
    let notebook = false;
    for (var name of Object.keys(collection)) {
        if (name.toLowerCase() === book.replace("-", " ")) {
            notebook = name;
            break;
        }
    }
    
    if (!notebook) throw new Error("URL DIDN'tMATCH THE NOTEBOOK");
    
    const active = useSelector(state => state.active);
    
    
    const notes = collection[notebook];



    function search(e) {
        e.preventDefault();
    }




    return <>
        <div className={styles.header}>
            <div className={styles.title}>
                <h1>{book.replace("-", " ")}</h1>
            </div>
            <Link to={"/exam-mode"}>
                <button className="button is-primary">Exam mode</button>
            </Link>
        </div>
    { 
        !active.note && !active.edit ? <>

        <form onSubmit={search} className={styles.search}>
            <div className="field is-grouped">
                <div className="control">
                    <input className="input" name="refine" placeholder="Search notes..." />
                </div>
                <div className="control">
                    <button className="button is-primary is-light" type="submit">Search</button>
                </div>
            </div>
        </form>  
        <div className={styles.notes}>
            <div onClick={() => dispatch(new_note())} className={styles.add}>
                <span>+</span>&nbsp;Add
            </div>
            {
                Object.keys(notes).map((val, idx) => (
                    <div key={idx} className={`${idx % 2 === 0 ? styles.colored : ""} ${styles.note}`}>
                        <a onClick={() => dispatch(set_note(val))}>
                            {val}
                        </a>
                        <span>
                            delete
                        </span>
                    </div>
                ))
            }
        </div>
        </>
        : 
        <div className={styles.popup}>
            {
                active.edit ? <> 
                    <Edit />

                </> : <View title={active.note} note={collection[active.notebook][active.note]}/>
            }
            
        </div>
    }
    </>
}
