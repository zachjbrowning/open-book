import React from 'react';
import styles from './Wireframe.module.scss';
import { Switch, Route } from 'react-router-dom';

import Nav from '../Nav/Nav';
import Notebooks from '../Notebooks/Notebooks';
import Notebook from '../Notebook/Notebook';

export default function Subframe() {
    return <>
        
        <main className={`${styles.lower} container`}>

            <div className="columns is-centered">
                <div className={`${styles.card} column is-10`}>
                    <Switch>
                        <Route exact path="/notebooks" component={Notebooks} />
                        <Route path="/notebooks/:book" component={Notebook} />
                    </Switch>
                    
                </div>
            </div>
        </main>
        <Nav />

    </>
}
