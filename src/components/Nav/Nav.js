import React, { useState } from 'react';
import styles from './Nav.module.scss';
import { Link, useHistory, Switch, Route, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { set_night } from '../../../lib/redux/actions/nightAction';
import { close, day, night, dots } from '../Utils/Icon';
import { set_modal, unset_modal } from '../../../lib/redux/actions/modalAction';
import { logout } from '../../../lib/redux/actions/authAction';
import { search_query, update_query } from '../../../lib/redux/actions/queryAction';
import Results from '../Utils/Results';


/*
    NAV COMPONENT
    Displays the navbar at the top of the screen. 
    Inserted from the  Wireframe component.
    When in exam mode, branding is replaced by search bar

*/
export default function Nav() {
    const isDark = useSelector(state => state.night);
    const dispatch = useDispatch();
    const history = useHistory();
    const { book } = useParams();
    
    //Swap between light and dark mode
    const toggle = e => {
        e.checked = !isDark; 
        dispatch(set_night(!isDark));
    }

    //Load login state to modal
    const do_logout = () => {
        hide_drop();
        dispatch(set_modal(
            "Logout", 
            "Ready to log out??", 
            () => {dispatch(logout()).then(() => {dispatch(unset_modal()); history.push("/")});}, 
            false,
            {
                yes : "Logout",
                no : "Cancel",
            }));
    }

    //Trigger search for when in exam mode
    const search = e => {
        e.preventDefault();
        const query = e.target.elements.examInput.value;
        dispatch(search_query(query));
    }

    const open_help = () => {
        hide_drop();
        window.open(`/static/user_manual.pdf`)
    }

    const show_drop = () => {
        var drop = document.getElementById("dropbox");
        drop.classList.add(styles.showDrop)
        drop.focus();
    }

    const hide_drop = () => {
        var drop = document.getElementById("dropbox");
        drop.classList.remove(styles.showDrop)
    }

    return <div className={styles.navBox}>
            <div className={`container ${styles.navFrame}`}>
                <Switch>
                    <Route exact path="/collections/:book/exam-mode">
                        <form onSubmit={search} className={styles.search}>
                            <input name="examInput" id="exam-input" className="input" placeholder="Start searching..." onChange={e => {e.preventDefault; dispatch(update_query(e.target.value))}} />
                            <Results inputId="exam-input" />
                        </form>
                    </Route>
                    <Route>
                        <div className={styles.title}>
                            <Link to="/collections/">
                                <h1 className={styles.brand}>Open Book</h1>
                            </Link>
                        </div>
                    </Route>
                </Switch>
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
                <Switch>
                    <Route exact path="/collections/:book/exam-mode">
                        <div className={styles.close}>
                            <Link to={`/collections/${book}/`}>
                                <svg viewBox="0 0 8192 8192">
                                    {close}
                                </svg>
                            </Link>
                        </div>
                    </Route>
                    <Route>
                        <div onClick={show_drop} className={styles.auth}>
                            <svg x="0px" y="0px" viewBox="0 0 8192 8192" >
                                {dots}
                            </svg>
                            <div tabIndex="0" id="dropbox" onBlur={hide_drop} className={styles.dropbox}>
                                <div className={styles.dropboxHover}>
                                    <div onClick={open_help} className={styles.op}>
                                        help
                                    </div>
                                    <div onClick={do_logout} className={styles.op}>
                                        logout
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Route>
                </Switch>
                
            </div>
    </div> 
    
}
