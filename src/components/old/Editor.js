import React from 'react';
import styles from './Editor.module.scss';
import { useSelector, useDispatch } from 'react-redux';

import { add_key, remove_key, clear_note } from '../../../lib/redux/actions/noteAction';
import { update_note, remove_note } from '../../../lib/redux/actions/notebookAction';

export default function Editor() {
    const note = useSelector(state => state.note);
    const notebook = useSelector(state => state.notebook);
    const dispatch = useDispatch();

    function addKey(e) {
        e.preventDefault();
        dispatch(add_key(e.target.elements.keyword.value.toLowerCase()));
        e.target.elements.keyword.value = "";
    }

    function removeKey(keyword) {
        dispatch(remove_key(keyword));
    }

    function saveNote() {
        let newTitle = document.getElementById("title-input").value.toLowerCase();
        let newNotes = document.getElementById("notes-input").value;
        if (newTitle === "" || newNotes === "") {
            //THROW AN ERROR, FIELDS EMPTY
            return;
        }
        if (newTitle !== note.title && newTitle in notebook) {
            //THROW AN ERROR, TITLE ALREADY USED
            return;
        }
        //HERE WE SHOULD REALLY CHECK TO SEE IF NAME ISN"T ALREADY BEING USED


        dispatch(update_note(newTitle, newNotes)).then(() => dispatch(clear_note()));

    }

    function deleteNote(e) {
        e.preventDefault();
        dispatch(remove_note(note.title)).then(() => dispatch(clear_note()));
    }

    return <>
        {
            note.state === "edit" ?
            <div className={`columns is-centered ${styles.editorBox}`}>
                <div className={`column is-10 ${styles.card}`}>
                    <div className="field control">
                        <label className="label">Title</label>
                        <input id="title-input" defaultValue={note.title} className="input" />
                    </div>
                    <div className="control">
                        <label className="label">Keywords</label>
                        <form onSubmit={addKey} className="field is-grouped">
                            <input className="input" placeholder="keyword..." name="keyword"/>
                            <button type="submit" className="button">Add</button>
                        </form>
                        <div className="field tags">
                            {
                                note.keywords.map((keyword, idx) => (
                                    <span className="tag" key={idx}>
                                        {keyword}
                                        <button onClick={() => removeKey(keyword)} className="delete is-small" />
                                    </span>
                                ))
                            }
                        </div>
                    </div>
                    <div className="field control">
                        <label className="label">Note</label>
                        <textarea id="notes-input" className="textarea" defaultValue={note.notes} />
                    </div>
                    <div className="field is-grouped control">
                        <button className="button is-primary" onClick={saveNote} >Save changes</button>
                        {
                            note.title !== "" ?
                            <button className="button" onClick={deleteNote} >Delete</button>
                            : ""
                        }
                    </div>
                    <div onClick={() => {dispatch(clear_note())}} className={styles.close}>Close</div>
                </div>
            </div>

            : ""
        }
    </> 
       
}
