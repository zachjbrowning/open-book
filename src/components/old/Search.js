import React from 'react';
import styles from './Search.module.scss';
import { useDispatch } from 'react-redux';

import { update_query } from '../../../lib/redux/actions/queryAction';
import Results from './Results';

export default function Search() {
    const dispatch = useDispatch();
    
    return <div className={`columns is-centered ${styles.searchBox}`}>
            <div className="column is-8 field is-grouped">
                <div className={`control ${styles.input}`}>
                    <input id="input" className={`input`} onChange={e => {e.preventDefault; dispatch(update_query(e.target.value))}} placeholder="Start searching..."/>
                    <Results inputId={"input"} />
                </div>
            </div>
        </div>
}
