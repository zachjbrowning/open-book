import React from 'react';
import styles from './Utils.module.scss';
import { useSelector, useDispatch } from 'react-redux';

import { clear_query } from '../../../lib/redux/actions/queryAction';
import { set_note } from '../../../lib/redux/actions/activeAction';


/*
    RESULTS COMPONENT
    Used to display the results as they are updated from the query.
    When there are no results, is hidden below search bar. 
    Is mounted from wherever the search bar is mounted.
*/
export default function Results(props) {
    const query = useSelector(state => state.query)
    const dispatch = useDispatch();

    // Query results and searched results use the same object,
    // so if it's being used for a search, dont display anything
    if (query.searched) {
        return <></>
    }


    // Select note clicked on as the active note
    function select(title) {
        dispatch(clear_query());
        document.getElementById(props.inputId).value = "";
        dispatch(set_note(title));
    }
    
    return <div className={styles.resultsBox}>
        <div className={`${query.results.length > 0 ? styles.border : ""} ${styles.resultsHover}`}>
            {
                query.results.map((title, idx) => <div onClick={() => select(title)} key={idx} className={styles.result}>
                    {title}
                </div>)
            }
        </div>
    </div>
}
