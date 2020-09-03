import React, { Suspense, lazy, useEffect } from 'react';
import styles from './Wireframe.module.scss';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Modal from '../Modal/Modal';
const Nav = lazy(() => import('../Nav/Nav'));
const Collections = lazy(() => import('../Collections/Collections'));
const Notebook = lazy(() => import('../Notebook/Notebook'));
const Exam = lazy(() => import('../Notebook/Exam'));

export default function Subframe() {
    const history = useHistory();
    const email = useSelector(state => state.auth.email);
    useEffect(() => {
        if (!email) {
            history.push("/");
        }
    }, [])

    return <>
        <main className={`${styles.constrict}`}>
            <Suspense fallback={<></>}>
                <Switch>
                    <Route exact path="/collections" component={Collections} />
                    <Route exact path="/collections/:book/exam-mode" component={Exam} />
                    <Route path="/collections/:book" component={Notebook} />
                </Switch>
            </Suspense>
        </main>
        <Suspense fallback={<></>}>
            <Switch>
                <Route exact path="/collections/:book/exam-mode" component={Nav} />
                <Route component={Nav} />
            </Switch>
        </Suspense>
        <Modal />
    </>
}
