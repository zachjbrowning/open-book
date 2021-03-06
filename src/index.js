import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Wireframe from './components/Wireframe/Wireframe'
import "../styles/styles.scss"
import { Provider } from "react-redux";
import store from "../lib/redux/store";

// Browser router : enable react router dom
// Provider : include Redux state management
// Wireframe : main distribution component


ReactDom.render(<BrowserRouter>
        <Provider store={store}>
            <Wireframe/>
        </Provider>
    </BrowserRouter>, document.getElementById('root'))