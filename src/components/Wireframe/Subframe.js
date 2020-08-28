import React, { Suspense, lazy} from 'react';
import styles from './Wireframe.module.scss';
import { Switch, Route } from 'react-router-dom';

import Modal from '../Modal/Modal';
const Nav = lazy(() => import('../Nav/Nav'));
const Notebooks = lazy(() => import('../Notebooks/Notebooks'));
const Notebook = lazy(() => import('../Notebook/Notebook'));


export default function Subframe() {
    return <>
        
        <main className={`${styles.constrict}`}>
            <Suspense fallback={<></>}>
                <Switch>
                    <Route exact path="/notebooks" component={Notebooks} />
                    <Route path="/notebooks/:book" component={Notebook} />
                </Switch>
            </Suspense>
        </main>
        <Suspense fallback={<></>}>
            <Nav />
        </Suspense>
        <Modal />
    </>
}
