import React, { Suspense, lazy} from 'react';
import styles from './Wireframe.module.scss';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Modal from '../Modal/Modal';
const Nav = lazy(() => import('../Nav/Nav'));
const Collections = lazy(() => import('../Collections/Collections'));
const Notebook = lazy(() => import('../Notebook/Notebook'));


export default function Subframe() {
    const history = useHistory();
    const email = useSelector(state => state.auth.email);
    if (!email) {
        history.push("/")
    };

    return <>
        <main className={`${styles.constrict}`}>
            <Suspense fallback={<></>}>
                <Switch>
                    <Route exact path="/collections" component={Collections} />
                    <Route path="/collections/:book" component={Notebook} />
                </Switch>
            </Suspense>
        </main>
        <Suspense fallback={<></>}>
            <Nav />
        </Suspense>
        <Modal />
    </>
}
