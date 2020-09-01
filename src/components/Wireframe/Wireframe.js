import React, { useEffect, Suspense, lazy }  from 'react';
import styles from './Wireframe.module.scss';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { auto_login } from '../../../lib/redux/actions/authAction';

const Landing = lazy(() => import('../Landing/Landing'));
const Exam = lazy(() => import('../Exam/Exam'));
const Subframe = lazy(() => import('./Subframe'));

export default function Wireframe() {
    const dispatch = useDispatch();    
    const location = useLocation();
    const history = useHistory();
    const email = useSelector(state => state.auth.email);

    const root = document.documentElement;
    root.style.setProperty("--background", "#FFFFFF");
    root.style.setProperty("--background-accent", "#EDEDED");
    root.style.setProperty("--text", "#222222");


    useEffect(() => {
        if (!email) {
            dispatch(auto_login())
            .then(res => {
                if (res && location.pathname === "/") history.push("/collections")
            })
        }
    }, [])
    
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
