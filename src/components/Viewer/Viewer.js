import React from 'react';
import styles from './Viewer.module.scss';
import { useSelector, useDispatch } from 'react-redux';

import { clear_note, edit_note } from '../../../lib/redux/actions/noteAction';

export default function Viewer() {
    const note = useSelector (state => state.note);
    const dispatch = useDispatch();
    
    return <>
        {
            note.state === "view" ? 
            <div className={`columns is-centered ${styles.viewerBox}`}>
                <div className={`column is-10 ${styles.card}`}>
                    <h5 className="title is-5">{note.title}</h5>
                    <br/>
                    <div className="tags">
                        {note.keywords.map((keyword, idx) => (
                            <span key={idx} className="tag is-dark">{keyword}</span>
                            ))}
                    </div>
                    <br/>
                    <div className={styles.text}>
                        {note.notes}
                    </div>
                    <div onClick={() => dispatch(edit_note())} className={styles.edit}>Edit</div>
                    <div onClick={() => dispatch(clear_note())} className={styles.close}>Close</div>

                </div>
            </div>
            : ""
        }
    </>
}
