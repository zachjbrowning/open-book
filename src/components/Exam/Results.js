import React from 'react';
import styles from './Exam.module.scss';
import { useSelector, useDispatch } from 'react-redux';

import { clear_query } from '../../../lib/redux/actions/queryAction';
import { load_note } from '../../../lib/redux/actions/noteAction';

export default function Results(props) {
    const results = useSelector(state => state.query.results)
    const dispatch = useDispatch();


    function select(title) {
        dispatch(clear_query());
        document.getElementById(props.inputId).value = "";
        dispatch(load_note(title));
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
