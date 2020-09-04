import React, { useEffect, Suspense, lazy }  from 'react';
import styles from './Wireframe.module.scss';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { set_night } from '../../../lib/redux/actions/nightAction';
import { Night } from '../../../lib/utils/localstorage';

import Modal from '../Modal/Modal';
const Landing = lazy(() => import('../Landing/Landing'));
const Nav = lazy(() => import('../Nav/Nav'));
const Collections = lazy(() => import('../Collections/Collections'));
const Notebook = lazy(() => import('../Notebook/Notebook'));
const Exam = lazy(() => import('../Notebook/Exam'));
const NotFound = lazy(() => import('../Utils/NotFound'));

export default function Wireframe() {
    const dispatch = useDispatch();    
    const history = useHistory();
    const email = useSelector(state => state.auth.email);
    const night = useSelector(state => state.night);
    

    useEffect(() => {
        //ONLY WANT TO REDIRECT IF ITS A RESTRICTED PAGE...
        if (!email) {
            history.push("/", { prev : history.location.pathname})
        }
        let true_night = Night.getNight();
        if (true_night !== null && true_night !== night) {
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
                        <Route exact path="/collections/:book/exam-mode" component={Exam} />
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
