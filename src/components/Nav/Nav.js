import React, { useState } from 'react';
import styles from './Nav.module.scss';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { toggle_night } from '../../../lib/redux/actions/nightAction';
import { day, night, auth } from '../Icons/Icon';

export default function Nav() {
    const isDark = useSelector(state => state.night);
    const dispatch = useDispatch();

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

    return <div className={styles.navBox}>
            <div className={`container ${styles.navFrame}`}>
                <div className={styles.title}>
                    <Link to="/notebooks">
                        <h1 className={styles.brand}>Open Book</h1>
                    </Link>
                </div>
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
                <div className={styles.auth}>
                    <svg x="0px" y="0px" viewBox="0 0 8192 8192" >
                        {auth}
                    </svg>
                </div>
                
            </div>
    </div> 
    
}
