import React from 'react';
import styles from './Wireframe.module.scss';
import { Switch, Route } from 'react-router-dom';

import Nav from '../Nav/Nav';
import Notebooks from '../Notebooks/Notebooks';


export default function Subframe() {
    return <>
        
        <main className="container">

            <div className="columns is-centered">
                <div className={`${styles.card} column is-10`}>
                    <Switch>
                        <Route path="/notebooks" component={Notebooks} />
                    </Switch>
                    
                </div>
            </div>
        </main>
        <Nav />

    </>
}
