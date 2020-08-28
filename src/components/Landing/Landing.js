import React, { useState } from 'react';
import styles from './Landing.module.scss';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { login, register } from '../../../lib/redux/actions/authAction';

export default function Landing() {
    const dispatch = useDispatch();
    const [state, setState] = useState("home");
    const history = useHistory();
    const do_login = e => {
        e.preventDefault();
        dispatch(login(e.target.elements.email.value, e.target.elements.pwd.value))
        .then(() => {
            history.push("/notebooks");
        })

    }

    const do_register = e => {
        e.preventDefault();
        dispatch(register(e.target.elements.email.value, e.target.elements.pwd.value, e.target.elements.first.value, e.target.elements.last.value))
        .then(() => {
            history.push("/notebooks");
        })
    }


    return <>
        <div className={styles.canvas} />
        <main>
            <div className={`container ${styles.mainFrame}`}>

                <div className={styles.boxLocator}>
                    
                    {
                        state === "home" ? <>
                        <div className={styles.box}>
                            <h1 className={`title is-1 ${styles.hello}`}>Openbook</h1>
                        </div>
                        <div className={`field is-grouped`}>
                            <div className="control">
                                <button onClick={() => setState("login")} className="button is-primary">Login</button>
                            </div>
                            <div className="control">
                                <button onClick={() => setState("register")} className="button">Sign up</button>
                            </div>
                        </div>
                        </> : ""
                    }
                    {
                        state === "login" ? <form onSubmit={do_login} className="form">
                            <div className="field">
                                <div className="control">
                                    <input className="input" placeholder="first name" name="first" />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <input className="input" placeholder="last name" name="last" />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <input className="input" placeholder="email" name="email" />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <input type="password" className="input" placeholder="pwd" name="pwd" />
                                </div>
                            </div>
                            <div className="field is-grouped">
                                <div className="control">
                                    <button type="submit" className="button is-primary">Login</button>
                                </div>
                                <div className="control">
                                    <button onClick={e => {e.preventDefault(); setState("home")}} className="button">Cancel</button>
                                </div>
                            </div>
                            <p>Don't have an account? <a onClick={() => setState("register")}>Register</a></p>
                        </form> : ""
                    }
                    {
                        state === "register" ? <form onSubmit={do_register} className="form">
                        <div className="field">
                            <div className="control">
                                <input className="input" placeholder="username" name="username" />
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <input type="password" className="input" placeholder="pwd" name="pwd" />
                            </div>
                        </div>
                        <div className="field is-grouped">
                            <div className="control">
                                <button type="submit" className="button is-primary">Register</button>
                            </div>
                            <div className="control">
                                <button onClick={e => {e.preventDefault(); setState("home")}} className="button">Cancel</button>
                            </div>
                        </div>
                        <p>Already have an account? <a onClick={() => setState("login")}>login</a></p>
                    </form> : "" 
                    }
                </div>


                {/* LOGIN PAGE */}
            </div>
        </main>
    </>
}
