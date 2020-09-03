import React, { useState, useEffect } from 'react';
import styles from './Notebook.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTransition, animated } from 'react-spring';

import { set_note, new_note, unset_note } from '../../../lib/redux/actions/activeAction';
import { del_note, load_collection } from '../../../lib/redux/actions/collectionAction';
import { update_query, search_query, clear_query } from '../../../lib/redux/actions/queryAction';
import { set_modal } from '../../../lib/redux/actions/modalAction';
import View from './View';
import Edit from './Edit';
import Results from '../Utils/Results';
import Searched from './Searched';

export default function Notebook() {
    const dispatch = useDispatch();
    const { book } = useParams();
    const collection = useSelector(state => state.collection);
    const searched = useSelector(state => state.query.searched);
    
    
    let notebook = false;
    for (var name of Object.keys(collection)) {
        if (name === book.replace(/-/g, " ")) {
            notebook = name;
            break;
        }
    }
    
    if (!notebook) throw new Error("URL DIDN'tMATCH THE NOTEBOOK");
    
    const active = useSelector(state => state.active);
    const notes = collection[notebook].notes;

    useEffect(() => {
        if (notes === false) {
            dispatch(load_collection(notebook, collection[notebook].id));
        }
    }, [collection])

    const transitions = useTransition(active.popup, null, {
        from : { opacity : 0, transform : "translateY(10rem)"},
        enter : { opacity : 1, transform : "translateY(0rem)" },
        leave : { opacity : 0, transform : "translateY(10rem)" },
    })

    function deleteNote(title, id) {
        dispatch(set_modal(
            "Are you sure?", 
            "Are you sure you want to delete this note? This action cannot be reverted.",
            () => {
                dispatch(del_note(active.notebook, id, title));
                return true;
            }, 
            false))
        
    }

    const select = title => {
        dispatch(clear_query()).
        then(
            dispatch(set_note(title))
        )
    }

    const search = e => {
        e.preventDefault();
        const query = e.target.elements.refine.value;
        dispatch(search_query(query));
    }

    return <>
        <div className={styles.header}>
            <div className={styles.title}>
                <h1>{book.replace("-", " ")}</h1>
            </div>
            <Link to={"exam-mode"}>
                <button className="button is-primary">Exam mode</button>
            </Link>
        </div>
        { 
            searched ? <Searched /> : <> 
                {!active.note && !active.edit ? 
                <>
                    <form onSubmit={search} className={styles.search}>
                        <div className="field is-grouped">
                            <div className={`control ${styles.wider}`}>
                                <input id="searchNotes" onChange={e => {e.preventDefault; dispatch(update_query(e.target.value))}} className="input" name="refine" placeholder="Search notes..." />
                                <Results inputId="searchNotes" />
                            </div>
                            <div className="control">
                                <button className="button is-primary is-light" type="submit">Search</button>
                            </div>
                        </div>
                    </form>  
                    <div className={styles.notes}>
                        <div onClick={() => dispatch(new_note())} className={styles.add}>
                            +<span>&nbsp;Add</span>
                        </div>
                        {
                            Object.keys(notes).map((val, idx) => (
                                <div key={idx} className={`${idx % 2 === 0 ? styles.colored : ""} ${styles.note}`}>
                                    <a onClick={() => select(val)}>
                                        {val}
                                    </a>
                                    <span onClick={() => deleteNote(val, notes[val].id)} >
                                        delete
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                </>
                : ""}
            
                
            </>
            

        }
        {
            transitions.map(({ item, key, props }) => 
            item && <animated.div id="BRUHH" key={key} style={props} className={styles.slideup}>
                {
                    active.edit ? <Edit />
                    : <View title={active.note} note={collection[active.notebook].notes[active.note]}/>
                }
            </animated.div>
        )}
    </>
}
