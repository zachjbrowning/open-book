import React, { useState } from 'react';
import styles from './Nav.module.scss';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { set_night } from '../../../lib/redux/actions/nightAction';
import { day, night, auth } from '../Utils/Icon';
import { set_modal, unset_modal } from '../../../lib/redux/actions/modalAction';
import { logout } from '../../../lib/redux/actions/authAction';

export default function Nav() {
    const isDark = useSelector(state => state.night);
    const dispatch = useDispatch();
    const history = useHistory();

    const toggle = e => {
        e.checked = !isDark; 
        dispatch(set_night(!isDark));
    }

    const do_logout = () => {
        dispatch(set_modal("Logout", "Ready to log out??", () => {dispatch(logout()).then(() => {dispatch(unset_modal()); history.push("/")});}, false));
    }

    return <div className={styles.navBox}>
            <div className={`container ${styles.navFrame}`}>
                <div className={styles.title}>
                    <Link to="/collections">
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
                <div onClick={do_logout} className={styles.auth}>
                    <svg x="0px" y="0px" viewBox="0 0 8192 8192" >
                        {auth}
                    </svg>
                </div>
                
            </div>
    </div> 
    
}
