import React, { useState } from 'react';
import styles from './Exam.module.scss';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { toggle_night } from '../../../lib/redux/actions/nightAction';
import { update_query } from '../../../lib/redux/actions/queryAction';
import { unset_note, set_note } from '../../../lib/redux/actions/activeAction';
import { close, day, night } from '../Icons/Icon';
import Results from './Results';

export default function Exam() {
    const dispatch = useDispatch();
    const isDark = useSelector(state => state.night);
    const collection = useSelector(state => state.collection);
    const active = useSelector(state => state.active);
    const eg = [
        {title : "Allo", words : "there guvna"},
        {title : "Allo", words : "there guvna"},
        {title : "Allo", words : "there guvna"},
    ]
    const [searched, setSearched] = useState(false);
    


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
    
    const select = title => {
        setSearched(false);
        dispatch(set_note(title));
    }

    const search = e => {
        e.preventDefault();
        const query = e.target.elements.examInput.value;
        let temp = []
        let dict = collection[active.notebook];
        for (var n of Object.keys(dict)) {
            let index = dict[n].notes.toLowerCase().indexOf(query);
            if (index !== -1) {
                temp.push({
                    title : n,
                    words : `...${dict[n].notes.slice(index - 50 >= 0 ? index - 50 : 0, index + query.length + 50)}...`
                })
            }
        }
        e.target.elements.examInput.value = "";
        dispatch(unset_note());
        setSearched(temp);
    }

    return <>
        <main className={styles.constrict}>
            {
                searched ? <div className={styles.searched}>
                    <h5>{searched.length} matches found</h5>
                    {
                        searched.map((val, idx) => <div onClick={() => select(val.title)} key={idx} className={`${styles.found} ${idx % 2 === 0 ? styles.colored : ""}`}>
                            <p>{val.title}</p>
                            <p>{val.words}</p>
                        </div>)
                    }
                </div> : <> {
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
                } </>
            }
        </main>
        <div className={styles.navBox}>
            <div className={`container ${styles.navFrame}`}>
                <form onSubmit={search} className={styles.search}>
                    <input name="examInput" id="exam-input" className="input" placeholder="Start searching..." onChange={e => {e.preventDefault; dispatch(update_query(e.target.value))}} />
                    <Results clearFunc={setSearched} inputId="exam-input" />
                </form>
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
