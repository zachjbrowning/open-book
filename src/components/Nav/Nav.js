import React from 'react';
import styles from './Nav.module.scss';


export default function Nav() {
    return (
        <div className={styles.navBox}>
            <div className={`container ${styles.navFrame}`}>
                Open Book
            </div>
        </div>
    )
}
