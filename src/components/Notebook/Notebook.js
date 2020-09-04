import React, { useEffect } from 'react';
import styles from './Notebook.module.scss';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTransition, animated } from 'react-spring';

import { set_note, new_note, unset_note } from '../../../lib/redux/actions/activeAction';
import { del_note, load_collection, load_all } from '../../../lib/redux/actions/collectionAction';
import { update_query, search_query, clear_query } from '../../../lib/redux/actions/queryAction';
import { set_modal } from '../../../lib/redux/actions/modalAction';
import View from './View';
import Edit from './Edit';
import Results from '../Utils/Results';
import Searched from './Searched';


/*
    NOTEBOOK COMPONENT
    Page for examining a single collection
    Displays all the notes, links to exam mode and houses editing/creating notes
    Active notebook comes from URL, so cross checking of URL occurs at start

*/
export default function Notebook() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { book } = useParams();
    const collection = useSelector(state => state.collection);
    const searched = useSelector(state => state.query.searched);
    const active = useSelector(state => state.active);
    
    /*
        Error checking URL
        Three cases:
        Collection : false => do nothing (dispatch hasn't resolved). Issue is resolved higher up in actions.
        Collection : {} => throw error, there can't be any notebooks if its empty
        Collection : {...} => check validity of notebook name from URL 
    */
    // Initial render, check what collection is
    const notebook = book.replace(/-/g, " ");
    useEffect(() => {
        if (collection && Object.keys(collection).length === 0) {
            history.push("/uh-oh/");
        } else {
            if (collection && Object.keys(collection).length > 0 && !(notebook in collection)) {
                history.push("/uh-oh/");
            }
        }
    }, [])
    
    //Checking to make sure notebook has been loaded
    useEffect(() => {
        if (collection && Object.keys(collection).length === 0) {
            history.push("/uh-oh/");
        } else if (collection && collection[notebook] && !collection[notebook].notes) 
            dispatch(load_collection(notebook, collection[notebook].id))
    }, [collection])
    
    // React Spring slidein for the popup
    const transitions = useTransition(active.popup, null, {
        from : { opacity : 0, transform : "translateY(10rem)"},
        enter : { opacity : 1, transform : "translateY(0rem)" },
        leave : { opacity : 0, transform : "translateY(10rem)" },
    })
    
    //If we're still waiting for the dispatch to resolve, return nothing
    if (!collection || Object.keys(collection).length === 0) return <></>
    
    //define notes to simplify later on stuff
    const notes = collection[notebook].notes;

    // Sets up the modal to display a deletion check to delete a note
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

    // Set a note as active to view it
    const select = title => {
        dispatch(clear_query()).
        then(
            dispatch(set_note(title))
        )
    }

    // Triggers a deep search on the query, to then display results
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
