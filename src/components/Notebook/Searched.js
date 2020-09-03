import React from 'react'
import styles from './Notebook.module.scss';
import { useDispatch, useSelector } from 'react-redux';

import { set_note } from '../../../lib/redux/actions/activeAction';
import { clear_query } from '../../../lib/redux/actions/queryAction';
import { close } from '../Utils/Icon';


export default function Searched(props) {
    const dispatch = useDispatch();
    const query = useSelector(state => state.query);
    
    
    const select = title => {
        dispatch(clear_query()).
        then(
            dispatch(set_note(title))
        )
    }

    const close_it = () => {
        dispatch(clear_query());
    }
    
    return (
        <div className={styles.searched}>
            <h5>{query.results.length} matches found</h5>
            <svg onClick={close_it} viewBox="0 0 8192 8192">
                {close}
            </svg>
            
            {
                query.results.map((val, idx) => <div onClick={() => select(val.title)} key={idx} className={`${styles.found} ${idx % 2 === 0 ? styles.colored : ""}`}>
                    <p className={styles.head}>{val.title.toUpperCase()}</p>
                    <p className={styles.word}>{val.words}</p>
                </div>)
            }
        </div>
    )
}
