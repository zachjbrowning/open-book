import React, { useEffect, Suspense, lazy }  from 'react';
import styles from './Wireframe.module.scss';
import { Switch, Route } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { load_collection } from '../../../lib/redux/actions/collectionAction';

const Landing = lazy(() => import('../Landing/Landing'));
const Exam = lazy(() => import('../Exam/Exam'));
const Subframe = lazy(() => import('./Subframe'));

export default function Wireframe() {
    

    const root = document.documentElement;
    root.style.setProperty("--background", "#FFFFFF");
    root.style.setProperty("--background-accent", "#EDEDED");
    root.style.setProperty("--text", "#222222");
    
    return <>
        <Suspense fallback={<></>}>

            <Switch>
                <Landing exact path="/" component={Landing} />
                <Route path="/exam-mode" component={Exam} />
                <Route component={Subframe} />
            </Switch>

        </Suspense>
        

    </>
    
}
