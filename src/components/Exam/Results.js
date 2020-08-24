import React from 'react';
import styles from './Exam.module.scss';
import { useSelector, useDispatch } from 'react-redux';

import { clear_query } from '../../../lib/redux/actions/queryAction';
import { set_note } from '../../../lib/redux/actions/activeAction';

export default function Results(props) {
    const results = useSelector(state => state.query.results)
    const dispatch = useDispatch();


    function select(title) {
        props.clearFunc(false);
        dispatch(clear_query());
        document.getElementById(props.inputId).value = "";
        dispatch(set_note(title));
    }
    
    return <div className={styles.resultsBox}>
        <div className={styles.resultsHover}>
            {
                results.map((title, idx) => <div onClick={() => select(title)} key={idx} className={styles.result}>
                    {title}
                </div>)
            }
        </div>
    </div>
}
