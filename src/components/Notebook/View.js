import React from 'react'
import styles from './Notebook.module.scss';
import { useDispatch } from 'react-redux';

import { unset_note, set_edit_note } from '../../../lib/redux/actions/activeAction';
import { edit, close } from '../Utils/Icon';

/*
    VIEW COMPONENT
    Used to display the contents of a note. Shows as a popup, 
    in conjuection with the edit component.
    Exists within the Exam and Notebook
*/
export default function View(props) {
    const dispatch = useDispatch();

    // This is to enable react spring transitions to work when no note is set
    if (!props.note) return <></>

    return <>
        <h5 className={`${styles.name} title is-5`}>{props.title}</h5>
        <div className={`tags ${styles.tags}`}>
            {props.note.keywords.map((keyword, idx) => (
                <span key={idx} className="tag is-dark">{keyword}</span>
                ))}
        </div>
        <div className={styles.text}>
            {props.note.notes}
        </div>
        {
            !props.restricted ? <svg onClick={() => dispatch(set_edit_note(props.title))} className={styles.edit} viewBox="0 0 8192 8192">
                {edit}
            </svg> : ""
        }
        
        <svg onClick={() => dispatch(unset_note())} className={styles.close} viewBox="0 0 8192 8192">
            {close}
        </svg>
    </>
}
