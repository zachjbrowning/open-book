import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Base from './components/Base'
import "../styles/styles.scss"
import { Provider } from "react-redux";
import store from "../lib/redux/store";

ReactDom.render(<Provider store={store}><Base/></Provider>, document.getElementById('root'))