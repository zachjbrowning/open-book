import React from 'react';
import styles from './Exam.module.scss';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { toggle_night } from '../../../lib/redux/actions/nightAction';
import { update_query } from '../../../lib/redux/actions/queryAction';
import { unset_note } from '../../../lib/redux/actions/activeAction';
import { close, day, night } from '../Icons/Icon';
import Results from './Results';

export default function Exam() {
    const dispatch = useDispatch();
    const isDark = useSelector(state => state.night);
    const collection = useSelector(state => state.collection);
    const active = useSelector(state => state.active);

    

    const toggle = e => {
        e.checked = !isDark; 
        dispatch(toggle_night());
        const root = document.documentElement;
        if (!isDark) {
            root.style.setProperty("--background", "#333333");
            root.style.setProperty("--background-accent", "#222222");
            root.style.setProperty("--text", "#DDDDDD");

        } else {
            root.style.setProperty("--background", "#FFFFFF");
            root.style.setProperty("--background-accent", "#EDEDED");
            root.style.setProperty("--text", "#222222");


        }
    }
    


    return <>
        <main className={styles.constrict}>
            {
                active.note ? 
                <div className={styles.popup}>
                    <h5 className={`${styles.name} title is-5`}>{active.note}</h5>
                    <div className={`tags ${styles.tags}`}>
                        {collection[active.notebook][active.note].keywords.map((keyword, idx) => (
                            <span key={idx} className="tag is-dark">{keyword}</span>
                            ))}
                    </div>
                    <div className={styles.text}>
                        {collection[active.notebook][active.note].notes}
                    </div>
                    <svg onClick={() => dispatch(unset_note())} className={styles.close} viewBox="0 0 8192 8192">
                        {close}
                    </svg>
                </div>
                : ""
            }
        </main>
        <div className={styles.navBox}>
            <div className={`container ${styles.navFrame}`}>
                <div className={styles.search}>
                    <input id="exam-input" className="input" placeholder="Start searching..." onChange={e => {e.preventDefault; dispatch(update_query(e.target.value))}} />
                    <Results inputId="exam-input" />
                </div>
                <div className={styles.toggle}>
                
                    <svg x="0px" y="0px" viewBox="0 0 8192 8192">
                        {day}
                    </svg>
                    
                    
                    <label className={styles.switch}>
                        <input type="checkbox" checked={isDark} onChange={() => (true)} onClick={toggle}/>
                        <span className={styles.slider} />
                    </label>


                    <svg x="0px" y="0px" viewBox="0 0 8192 8192">
                        {night}
                    </svg>
                </div>
                <div className={styles.close}>
                    <Link to={`/notebooks/${active.notebook.toLowerCase().replace(" ", "-")}`}>
                        <svg viewBox="0 0 8192 8192">
                            {close}
                        </svg>
                    </Link>
                </div>
                
            </div>
        </div> 
        
    </>
}
