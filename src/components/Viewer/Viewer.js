import React from 'react';
import styles from './Viewer.module.scss';

import { useSelector } from 'react-redux';

export default function Viewer() {
    const note = useSelector (state => state.note);
    
    return <div className={`columns is-centered ${styles.viewerBox}`}>
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

        </div>
    </div>
}
