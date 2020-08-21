import React from 'react';
import styles from './Landing.module.scss';
import { Link } from 'react-router-dom';

export default function Landing() {
    return <>
        <div className={styles.canvas} />
        <main>
            <div className={`container ${styles.mainFrame}`}>
                {/* LANDING PAGE */}
                <div className={styles.boxLocator}>
                    <div className={styles.box}>
                        <h1 className={`title is-1 ${styles.hello}`}>Openbook</h1>
                    </div>
                    <div className={`field is-grouped`}>
                        <div className="control">
                            <Link to={"/notebooks"}>
                                <button className="button is-primary">Login</button>
                            </Link>
                        </div>
                        <div className="control">
                            <button className="button">Sign up</button>
                        </div>
                    </div>
                </div>


                {/* LOGIN PAGE */}
            </div>
        </main>
    </>
}
