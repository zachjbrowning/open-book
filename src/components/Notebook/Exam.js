import React from 'react'
import styles from './Notebook.module.scss';
import { useSelector, useDispatch } from 'react-redux';

import Searched from './Searched';
import View from './View';

export default function Exam() {
    const dispatch = useDispatch();
    const searched = useSelector(state => state.query.searched);
    const active = useSelector(state => state.active);
    const collection = useSelector(state => state.collection);
    return <>
        {
            searched ? <Searched /> : ""
        }

        {
            active.note ? <div className={styles.slideup}>
                <View title={active.note} note={collection[active.notebook].notes[active.note]} restricted={true} />
            </div>
            : ""
        }

    </>
}
