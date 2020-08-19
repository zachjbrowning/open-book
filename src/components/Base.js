import React from 'react'
import ZJBlogo from './ZJBlogo'
import styles from "./Base.module.scss";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { spinner_toggle } from "../../lib/redux/actions/spinnerAction";
import ExampleAPI from "../../lib/api/example";

export default function Base() {
    const [msg, setMsg] = useState("");
    const spin = useSelector(state => state.spinner)
    const dispatch = useDispatch();

    useEffect(() => {
        ExampleAPI.get("hello_world")
        .then(res => setMsg(res.data.msg))
        .catch(err => setMsg("Couldn't connect to backend :("));
        
    }, []);

    return (
        <div className="container">
            <div className="columns is-multiline is-centered">
                <div className={`column is-10 ${styles.box}`}>
                    <h1 className={`title is-1 ${styles.speak}`}>Happy Building!!</h1>
                </div>
                <div className={`column ${styles.box} is-6`}>
                    <button onClick={() => dispatch(spinner_toggle())} className="button is-primary">
                        { spin ? 
                        "Woahhh slow down..."
                        :
                        "Go for a spin"
                        }
                    </button>
                </div>
                <div className={`column is-10 ${styles.box}`}>
                    <ZJBlogo/>
                </div>
                <div className={`column is-10 ${styles.box}`}>
                    <p>{msg}</p>
                </div>
            </div>
        </div>
    )
}
