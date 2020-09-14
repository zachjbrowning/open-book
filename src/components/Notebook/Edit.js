import React, { useState } from 'react';
import styles from './Notebook.module.scss';
import { useSelector, useDispatch } from 'react-redux';

import { unset_note, new_cat, del_cat } from '../../../lib/redux/actions/activeAction';
import { close } from '../Utils/Icon';
import { new_note, edit_note, new_cat_collection, del_cat_collection, del_note } from '../../../lib/redux/actions/collectionAction';

/*
    EDIT COMPONENT
    Used to create and edit notes within a collection. 
    Exists inside the same popup as View, inside the Notebook component.
*/
export default function Edit(props) {
    const dispatch = useDispatch();
    
    const active = useSelector(state => state.active);
    const collection = useSelector(state => state.collection);
    
    const [warning, setWarning] = useState(false);
    let keywords = active.note ? collection[active.notebook].notes[active.note].keywords : active.new;
    

    /*
        Add a category to note. Mostly handled by redux.
        Two cases : new note, edited note
    */
    const addCat = e => {
        e.preventDefault();
        let splits = e.target.elements.keyword.value.toLowerCase().split(' ');
        let new_word = "";
        for (var word of splits) {
            if (word !== "") {
                if (new_word !== "") {
                    new_word = new_word.concat(" ").concat(word); 
                } else new_word = word;
            }
        }
        if (new_word === "") return;
        e.target.elements.keyword.value = "";
        if (active.new ) {
            dispatch(new_cat(new_word));
        } else {
            console.log(collection)
            dispatch(new_cat_collection(
                active.notebook, 
                collection[active.notebook].notes[active.note].id,
                active.note, 
                new_word))
        }

    }


    /*
        Remove a category to note. Mostly handled by redux.
        Two cases : new note, edited note
    */
    const removeCat = key => {
        if (active.new) {
            dispatch(del_cat(key));
        } else {
            dispatch(del_cat_collection(
                active.notebook, 
                collection[active.notebook].notes[active.note].id,
                active.note, 
                key));
        }
    }

    /*
        Create a new note. Do some error checking then submit to redux
        Two cases : new note, edited note
    */
    const saveNote = () => {
        let title = document.getElementById("title-input").value.toLowerCase();
        let notes = document.getElementById("notes-input").value;
        
        //ERROR CHECKING REQUIRED FEILDS
        if (!title || !notes) {
            setWarning("Please fill out both the title and note field.")
            return;
        } 
        //ERROR CHECKING VALID TITLE
        else if (!title.match(/^[0-9a-zA-Z ]+$/) || title.match(/^[ ]+$/)) {
            setWarning("Your title is invalid. Please only use alphanumerics and spaces.")
            return;
        } 
        //ERROR CHECKING DISTINCT TITLE
        else if ((active.new && title in collection[active.notebook].notes) ||
        (!active.new && active.note !== title && title in collection[active.notebook].notes)) {
            setWarning("A note already exists with this name. Please use a distinct name.")
            return;
        }
        
        //IF BRAND NEW NOTE
        if (active.new) {
            dispatch(new_note(
                active.notebook, 
                collection[active.notebook].id,
                title, 
                active.new,
                notes))
            .then(() => {
                dispatch(unset_note());
            });
        } 
        //IF EDITING A NOTE
        else {
            dispatch(edit_note(
                active.notebook,
                collection[active.notebook].notes[active.note].id,
                active.note, 
                title,
                keywords,
                notes 
            ))
            .then(dispatch(unset_note()));
        }
    }

    

    return <>
        <div className="control">
            {
                warning ? 
                <div className="notification is-primary">
                    <button className="delete" onClick={() => setWarning(false)} />
                    {warning}
                </div>
                : ""
            }
        </div>

        <div className="field control">
            <label className="label">Title</label>
            <input required={true} id="title-input" defaultValue={active.note ? active.note : ""} className="input" />
        </div>
        <div className="control">
            <label className="label">Keywords</label>
            <form onSubmit={addCat} className="field is-grouped">
                <div className="control">
                    <input className="input" placeholder="keyword..." name="keyword"/>
                </div>
                <div className="control">
                    <button type="submit" className="button is-primary is-light">Add</button>
                </div>
            </form>
            <div className="field tags">
                {
                    keywords.map((keyword, idx) => (
                        <span className="tag" key={idx}>
                            {keyword}
                            <button onClick={() => removeCat(keyword)} className="delete is-small" />
                        </span>
                    ))
                }
            </div>
        </div>
        <div className="field control">
            <label className="label">Note</label>
            <textarea required={true} id="notes-input" className="textarea" defaultValue={active.note ? collection[active.notebook].notes[active.note].notes : ""} />
        </div>
        <div className="field is-grouped control">
            <div onClick={saveNote} className="control">
                <button className="button is-primary" >Save</button>
            </div>
            {
                active.edit && active.note ?
                <div className="control">
                    <button className="button is-primary is-light" >Delete</button>
                </div>
                : ""
            }
        </div>
        <svg onClick={() => dispatch(unset_note())} className={styles.close} viewBox="0 0 8192 8192">
            {close}
        </svg>
    </>
}
