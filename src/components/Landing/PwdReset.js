import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Landing.module.scss';
import { useHistory } from 'react-router-dom';


import PwdAPI from '../../../lib/api/pwd';
import { set_modal } from '../../../lib/redux/actions/modalAction';
/*
    PWDRESET COMPONENT
    Standalone component that checks the token found in url 
    before resetting pwd


*/
export default function PwdReset() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [alert, setAlert] = useState(false);

        
    const warn = alert ? <div className={`notification is-primary ${styles.alert}`}>
        <button className="delete" onClick={() => setAlert(false)} />
        {alert}
    </div> : ""
    
    function attempt_reset(e) {
        e.preventDefault();
        let token = e.target.elements.token.value
        let pwd = e.target.elements.pwd.value
        PwdAPI.hard_reset(token, pwd)
        .then(res => {
            if (res.data?.success) {
                dispatch(set_modal(
                    "Success!!",
                    "Your password has been reset. You may now login using that password",
                    () => true,
                    false,
                    {
                        yes : "Yay!!",
                        no : false,
                    }
                ));
                history.push("/");
            } else {
                setAlert("It seems the reset code you used is invalid. Please make sure it is the most recent and is correct. A code cannot be reused.")
            }
        })
        .catch(err => {
            console.log(err);
            setAlert("An error occured. Please try again later.")
        })

        e.target.elements.pwd.value = ""
        e.target.elements.token.value = ""
    }

    function go_home() {
        history.push("/");
    }

    return <>
        <div className={styles.canvas} />
        <main className={styles.hide}>
            <div className={styles.movable}>
                <div className={`container ${styles.center}`}>
                    <div className={`${styles.lower} column is-8`}>
                        <div className={styles.brief}>
                            Please provide your reset code and a new password to continue.
                        </div>

                        {warn}
                        <form className="form" onSubmit={attempt_reset}>
                            <div className="field">
                                <div className="control">
                                    <input required={true} className="input" placeholder="reset code" name="token" />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <input required={true} className="input" placeholder="new password" name="pwd" />
                                </div>
                            </div>
                            <div className={`field is-grouped`}>
                            <div className="control">
                                <button type="submit" className="button is-primary">Submit</button>
                            </div>
                            <div className="control">
                                <button onClick={go_home} className="button">JOKES I know my pwd</button>
                            </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
            
        </main>
    </>
}
