import React from 'react';
import styles from './Notebook.module.scss';
import { useSelector, useDispatch } from 'react-redux';

import { unset_note, new_cat, del_cat } from '../../../lib/redux/actions/activeAction';
import { close } from '../Utils/Icon';
import { new_note, edit_note, new_cat_collection, del_cat_collection, del_note } from '../../../lib/redux/actions/collectionAction';

export default function Edit(props  ) {
    const dispatch = useDispatch();
    const active = useSelector(state => state.active);
    const collection = useSelector(state => state.collection);
    let keywords = active.note ? collection[active.notebook][active.note].keywords : active.new;
    
    const addCat = e => {
        e.preventDefault();
        if (e.target.elements.keyword.value === "") return;
        if (active.new ) {
            dispatch(new_cat(e.target.elements.keyword.value.toLowerCase()));
        } else {
            dispatch(new_cat_collection(active.notebook, active.note, e.target.elements.keyword.value.toLowerCase()))
        }

        e.target.elements.keyword.value = "";
    }

    const removeCat = key => {
        if (active.new) {
            dispatch(del_cat(key));
        } else {
            dispatch(del_cat_collection(active.notebook, active.note, key));
        }
    }

    const saveNote = () => {
        if (active.new) {
            dispatch(new_note(active.notebook, document.getElementById("title-input").value, {
                keywords : active.new,
                notes : document.getElementById("notes-input").value,
            }))
            .then(() => {
                dispatch(unset_note());
            });
        } else {
            dispatch(edit_note(active.note, active.notebook, document.getElementById("title-input").value, {
                keywords : collection[active.notebook][active.note].keywords,
                notes : document.getElementById("notes-input").value,
            }))
            .then(dispatch(unset_note()));
        }
    }

    

    return <>

        <div className="field control">
            <label className="label">Title</label>
            <input id="title-input" defaultValue={active.note ? active.note : ""} className="input" />
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
            <textarea id="notes-input" className="textarea" defaultValue={active.note ? collection[active.notebook][active.note].notes : ""} />
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
