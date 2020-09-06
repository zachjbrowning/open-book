import React from 'react';
import styles from './Utils.module.scss';
import { Link } from 'react-router-dom';

/*
    NOTFOUND COMPONENT
    Very basic error page. Currently used for everything but to be made more
    personalised to certain errors.
*/
export default function NotFound() {
    return <>
        <h1 className={`title is-1 ${styles.ohdear}`}>Oh Dear...</h1>
        <h4 className={`title is-4 ${styles.color}`}>{"Something went wrong :(\n\nTwo possibilities here - the URL you entered was invalid or we stuffed up (much more likely...)"}</h4>
        <h3 className={`title is-3 ${styles.color}`}>Ok then. <Link to={"/"}>Take me home</Link></h3>
    </>
}
