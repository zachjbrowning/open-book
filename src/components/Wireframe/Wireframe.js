import React from 'react';
import styles from './Wireframe.module.scss';
import {Route, Switch} from 'react-router-dom';


import Landing from '../Landing/Landing';
import Exam from '../Exam/Exam';
import Subframe from './Subframe';



export default function Wireframe() {
    const root = document.documentElement;
    root.style.setProperty("--background", "#FFFFFF");
    root.style.setProperty("--background-accent", "#EDEDED");
    root.style.setProperty("--text", "#222222");
    
    return <>
        <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/exam-mode" component={Exam} />
            <Route component={Subframe} />
        </Switch>
        

    </>
    
}
