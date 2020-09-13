import React, { useState, useEffect } from 'react';
import styles from './Landing.module.scss';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTransition, animated } from 'react-spring';

import { auto_login } from '../../../lib/redux/actions/authAction';
import { login, register } from '../../../lib/redux/actions/authAction';
import { set_modal } from '../../../lib/redux/actions/modalAction';
import PwdAPI from '../../../lib/api/pwd';
/*
    LANDING COMPONENT
    Is the login page for the site. Toggles between home,
    login and register.
    Mounted from the Wireframe Component. 

*/
export default function Landing() {
    const dispatch = useDispatch();
    const email = useSelector(state => state.auth.email);
    const [state, setState] = useState(0);
    const [alert, setAlert] = useState("haha ayeee");
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    
    const transitions = useTransition(state, p => p, {
        from: { transform: 'translateY(0rem)', opacity: 1 },
        enter: { transform: 'translateY(0rem)', opacity: 1 },
        leave: { transform: 'translateY(0rem)', opacity: 1 },
    })

    // Swap between which section is showings
    const changeState = next => {
        setAlert(false);
        setState(next);
    }
    
    // Attempt to log in
    const do_login = e => {
        e.preventDefault();
        setLoading(true);
        dispatch(login(e.target.elements.email.value, e.target.elements.pwd.value))
        .then(res => {
            setLoading(false);
            if (res.success) {
                history.push("/collections/");
            } else {
                if ('error' in res) setAlert(res.error);
                else history.push('/uh-oh/');
            }
        })

    }

    // Attempt to register user
    const do_register = e => {
        e.preventDefault();
        setLoading(true);
        dispatch(register(e.target.elements.email.value, e.target.elements.pwd.value, e.target.elements.first.value, e.target.elements.last.value))
        .then(res=> {
            setLoading(false);
            if (res.success) {
                history.push("/collections/");
                dispatch(set_modal(
                    "Hello stranger!!",
                    <p>
                        First time?? Feel free to watch a quick <a>tutorial video</a> to familiarise yourself with the interface.
                    </p>,
                    () => true,
                    false,
                    {
                        yes : "Sounds good!",
                        no : false,
                    }
                ))
            } else {
                if ('error' in res) setAlert(res.error);
                else history.push('/uh-oh/');
            }
        })
    }

    // Show forgot password modal
    const forgot_pwd = () => {
        dispatch(set_modal(
            "Password reset",
            <>
                Please type your email here to start the reset process.
                <br/>
                <div className="field">
                    <div className="control">
                        <input id="email-reset" placeholder="email" className="input"/>
                    </div>
                </div>
            </>,
            () => {
                let try_email = document.getElementById("email-reset").value
                if (try_email) {
                    PwdAPI.request(try_email)
                    .then(() => {
                        dispatch(set_modal(
                            "Password reset",
                            "If your email address was valid, you will recieve an email. Please check your spam folder.",
                            () => true,
                            false,
                            {
                                yes : "Ok",
                                no : false,
                            }

                        ));
                    })

                }
                return false;
            },
            false,
            {
                yes : "Submit",
                no : "Cancel",
            }
        ))
    } 
    
    // When component is mounted, attempt to auto login user from localstate
    useEffect(() => {
        let next = false;
        if (history.location.state) next = history.location.state;
        if (!email) {
            dispatch(auto_login())
            .then(res => {
                if (res.success) {
                    if (history.location.state?.prev && history.location.state.prev !== "/") history.push(history.location.state.prev);
                    else {
                        history.push("/collections/");
                    }
                } else if (res.success === false) {
                    history.push("/uh-oh/");
                }
            })
        } else {
            if (history.location.state?.prev && history.location.state.prev !== "/") history.push(history.location.state.from);
            else history.push("/collections/");
        }
    }, [])


    // Predefine different possible sections. This is to make react-spring
    // easier to use later on
    const warn = alert ? <div className={`notification is-primary ${styles.alert}`}>
        <button className="delete" onClick={() => setAlert(false)} />
        {alert}
    </div> : ""
    const sections = [
        ({ style }) => <animated.div className={styles.movable} style={style}>
            <div className={`container ${styles.center}`}>
                <div className={`${styles.lower} column is-8`}>
                    <div className={styles.box}>
                        <h1 className={`title is-1 ${styles.hello}`}>Openbook</h1>
                    </div>
                    <div className={`field is-grouped`}>
                        <div className="control">
                            <button onClick={() => changeState(1)} className="button is-primary">Login</button>
                        </div>
                        <div className="control">
                            <button onClick={() => changeState(2)} className="button">Sign up</button>
                        </div>
                    </div>
                </div>
            </div>
        </animated.div>,
        ({ style }) => <animated.div className={styles.movable} style={style}>
            <div className={`container ${styles.center}`}>
                <div className={`${styles.lower} column is-8`}>
                    {warn}
                    <form onSubmit={do_login} className="form">
                        <div className="field">
                            <div className="control">
                                <input required={true} className="input" placeholder="email" name="email" />
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <input required={true} type="password" className="input" placeholder="pwd" name="pwd" />
                            </div>
                        </div>
                        {
                            loading ? 
                            <div className={`field ${styles.prog}`}>
                                <div className="control">
                                    <progress className="progress is-small is-primary" max="100">50</progress>
                                </div>
                            </div>
                            : <>
                                <div className="field is-grouped">
                                    <div className="control">
                                        <button type="submit" className="button is-primary">Login</button>
                                    </div>
                                    <div className="control">
                                        <button onClick={e => {e.preventDefault(); changeState(0)}} className="button">Cancel</button>
                                    </div>
                                </div>
                                <p>Oops... <a onClick={forgot_pwd}>I forgot my password</a>...</p>
                                <p>Don't have an account? <a onClick={() => changeState(2)}>Register</a></p>
                            </>
                        }
                    </form>
                </div>
            </div>
        </animated.div>,
        ({ style }) => <animated.div className={styles.movable} style={style}>
            <div className={`container ${styles.center}`}>
                <div className={`${styles.lower} column is-8`}>
                    {warn}
                    <form onSubmit={do_register} className="form">
                        <div className="field">
                            <div className="control">
                                <input required={true} className="input" placeholder="first name" name="first" />
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <input required={true} className="input" placeholder="last name" name="last" />
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <input required={true} className="input" placeholder="email" name="email" />
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <input required={true} type="password" className="input" placeholder="pwd" name="pwd" />
                            </div>
                        </div>
                        {
                            loading ? 
                            <div className="field">
                                <div className="control">
                                    <progress className="progress is-small is-primary" max="100">50</progress>
                                </div>
                            </div>
                            : <>
                                <div className="field is-grouped">
                                    <div className="control">
                                        <button type="submit" className="button is-primary">Register</button>
                                    </div>
                                    <div className="control">
                                        <button onClick={e => {e.preventDefault(); changeState(0)}} className="button">Cancel</button>
                                    </div>
                                </div>
                                <p>Already have an account? <a onClick={() => changeState(1)}>login</a></p>
                            </>
                        }
                    </form>
                </div>
            </div>
        </animated.div>
    ]



    return <>
        <div className={styles.canvas} />
        <main className={styles.hide}>
            {
            
                transitions.map(({ item, props, key }) => {
                    const Page = sections[item];
                    return <Page key={key} style={props} />
                }) 
            }
            
        </main>
    </>
}
