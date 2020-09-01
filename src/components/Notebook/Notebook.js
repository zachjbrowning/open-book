import React, { useState, useEffect } from 'react';
import styles from './Notebook.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { set_note, new_note, unset_note } from '../../../lib/redux/actions/activeAction';
import { del_note, load_collection } from '../../../lib/redux/actions/collectionAction';
import { update_query } from '../../../lib/redux/actions/queryAction';
import { set_modal } from '../../../lib/redux/actions/modalAction';
import View from './View';
import Edit from './Edit';
import Results from '../Utils/Results';
import { close } from '../Utils/Icon';

export default function Notebook() {
    const dispatch = useDispatch();
    const { book } = useParams();
    const collection = useSelector(state => state.collection);
    const [searched, setSearched] = useState(false);
    let notebook = false;
    for (var name of Object.keys(collection)) {
        if (name.toLowerCase() === book.replace("-", " ")) {
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



    function deleteNote(title) {
        dispatch(set_modal(
            "Are you sure?", 
            "Are you sure you want to delete this note? This action cannot be reverted.",
            () => {
                dispatch(del_note(active.notebook, title));
                return true;
            }, 
            false))
        
    }

    const select = title => {
        setSearched(false);
        dispatch(set_note(title));
    }

    const search = e => {
        e.preventDefault();
        const query = e.target.elements.refine.value;
        dispatch(update_query(""));
        let temp = []
        let dict = collection[active.notebook];
        for (var n of Object.keys(dict)) {
            let index = dict[n].notes.toLowerCase().indexOf(query.toLowerCase());
            if (index !== -1) {
                temp.push({
                    title : n,
                    words : `...${dict[n].notes.slice(index - 50 < 0 ? 0 : index - 50, index)}${dict[n].notes.slice(index, index + query.length).toUpperCase()}${dict[n].notes.slice(index + query.length, index + query.length + 50)}...`
                })
            }

            
        }
        e.target.elements.refine.value = "";
        dispatch(unset_note());
        setSearched(temp);
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
        searched ? <div className={styles.searched}>
            <h5>{searched.length} matches found</h5>
            <svg onClick={() => setSearched(false)} viewBox="0 0 8192 8192">
                {close}
            </svg>
            
            {
                searched.map((val, idx) => <div onClick={() => select(val.title)} key={idx} className={`${styles.found} ${idx % 2 === 0 ? styles.colored : ""}`}>
                    <p className={styles.head}>{val.title.toUpperCase()}</p>
                    <p className={styles.word}>{val.words}</p>
                </div>)
            }
        </div> : ( 
            !active.note && !active.edit ? 
            <>
                <form onSubmit={search} className={styles.search}>
                    <div className="field is-grouped">
                        <div className={`control ${styles.wider}`}>
                            <input id="searchNotes" onChange={e => {e.preventDefault; dispatch(update_query(e.target.value))}} className="input" name="refine" placeholder="Search notes..." />
                            <Results clearFunc={v => v} inputId="searchNotes" />
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
                                <span onClick={() => deleteNote(val)} >
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

                    </> : <View title={active.note} note={collection[active.notebook].notes[active.note]}/>
                }
                
            </div>
        )
        

    }
    </>
}
