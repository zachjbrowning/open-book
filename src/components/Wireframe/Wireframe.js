import React, { useEffect, Suspense, lazy }  from 'react';
import styles from './Wireframe.module.scss';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { set_night } from '../../../lib/redux/actions/nightAction';
import { Night } from '../../../lib/utils/localstorage';

import Modal from '../Modal/Modal';
//LAZY LOAD MOST OF THE COMPONENTS
import Landing from '../Landing/Landing';
import Nav from '../Nav/Nav';
import Collections from '../Collections/Collections';
import Notebook from '../Notebook/Notebook';
import NotFound from '../Utils/NotFound';
//const Landing = lazy(() => import('../Landing/Landing'));
//const Nav = lazy(() => import('../Nav/Nav'));
//const Collections = lazy(() => import('../Collections/Collections'));
//const Notebook = lazy(() => import('../Notebook/Notebook'));
//const NotFound = lazy(() => import('../Utils/NotFound'));

/*
    WIREFRAME COMPONENT
    Is what is directly rendered from the root element. 
    Mainly a bunch of routes that then lazy load the necessary
    component. 
*/
export default function Wireframe() {
    const dispatch = useDispatch();    
    const history = useHistory();
    const email = useSelector(state => state.auth.email);
    const night = useSelector(state => state.night);
    
    // On inital render, redirect if need to login first
    // Ensure night mode status matches localstate
    useEffect(() => {
        //TODO : only redirect if it's a page that requires login
        if (!email) {
            history.push("/", { prev : history.location.pathname})
        }
        let true_night = Night.getNight();
        if (true_night === null || true_night !== night) {
            dispatch(set_night(true_night === "true"));
        }
    }, [])
    


    return <>
        <Suspense fallback={<></>}>

            <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/uh-oh/">
                    <main className={styles.constrict}>
                        <NotFound />
                    </main>
                </Route>
                <Route>
                    <main className={styles.constrict}>
                        <Route exact path="/collections/" component={Collections} />
                        <Route exact path="/collections/:book/exam-mode" component={Notebook} />
                        <Route exact path="/collections/:book/" component={Notebook} />
                    </main>
                    <Switch>
                        <Route exact path="/collections/:book/exam-mode" component={Nav} />
                        <Route component={Nav} />
                    </Switch>
                    <Modal />
                </Route>
            </Switch>

        </Suspense>
        

    </>
    
}
