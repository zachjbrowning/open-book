import React from 'react';
import styles from './Nav.module.scss';
import { useDispatch } from 'react-redux';


export default function Nav() {
    return (
        <div className={styles.navBox}>
            <div className={`container ${styles.navFrame}`}>
                <div className="">
                    Open Book
                </div>
                <ul className={styles.buttons}>
                    <li>
                        <a>
                            Create
                        </a>
                    </li>
                    <li>
                        <a>
                            Load
                        </a>
                    </li>
                    <li>
                        <a>
                            Commit
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
