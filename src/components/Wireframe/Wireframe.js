import React from 'react';
import styles from './Wireframe.module.scss';
import {Route, Switch} from 'react-router-dom';


import Landing from '../Landing/Landing';
import Exam from '../old/Exam';
import Subframe from './Subframe';



export default function Wireframe() {
    return <>
        <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/exam-mode" component={Exam} />
            <Route component={Subframe} />
        </Switch>
        

    </>
    
}
