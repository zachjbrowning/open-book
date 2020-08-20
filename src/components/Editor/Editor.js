import React from 'react';
import styles from './Editor.module.scss';
import { useSelector, useDispatch } from 'react-redux';


export default function Editor() {
    const note = useSelector(state => state.note);
    
    function addKey(e) {
        e.preventDefault();
    }

    function removeKey(keyword) {
        
    }

    function saveNote(e) {
        e.preventDefault();
    }

    return <>
        {
            note.state === "edit" ?
            <div className={`columns is-centered ${styles.editorBox}`}>
                <form onSubmit={saveNote} className={`column is-10 ${styles.card}`}>
                    <div className="field control">
                        <label className="label">Title</label>
                        <input defaultValue={note.title} className="input" />
                    </div>
                    <div className="control">
                        <label className="label">Keywords</label>
                        <div className="field is-grouped">
                            <input className="input" placeholder="keyword..." />
                            <button onClick={addKey} className="button">Add</button>
                        </div>
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
                        <textarea className="textarea" defaultValue={note.notes} />
                    </div>
                    <div className="field control">
                        <button className="button is-primary" type="submit">Save changes</button>
                    </div>
                </form>
            </div>

            : ""
        }
    </> 
       
}
