import React from 'react';
import styles from './Nav.module.scss';
import { useDispatch } from 'react-redux';

import { clear_note, edit_note } from '../../../lib/redux/actions/noteAction';
import { save_notebook, load_notebook } from '../../../lib/redux/actions/notebookAction';

export default function Nav() {
    const dispatch = useDispatch();
    
    return (
        <div className={styles.navBox}>
            <div className={`container ${styles.navFrame}`}>
                <div className="">
                    Open Book
                </div>
                <ul className={styles.buttons}>
                    <li>
                        <a onClick={() => dispatch(clear_note()).then(() => dispatch(edit_note()))}>
                            Create
                        </a>
                    </li>
                    <li>
                        <a onClick={() => dispatch(load_notebook())}>
                            Load
                        </a>
                    </li>
                    <li>
                        <a onClick={() => dispatch(save_notebook())}>
                            Commit
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
