import React from 'react';
import styles from './Notebooks.module.scss';
import { Link } from 'react-router-dom';

export default function Notebooks() {
    const data = [
        "COMP3511",
        "data structurse",
        "Yeet"
    ]
    const name = "Zachary"
    
    return <>
        <div className={styles.welcome}>
            <h1>Welcome, <span>{name}</span>!!</h1>        
        </div>
        <div className={styles.collections}>
            <h3>Your collections</h3>
            <div >
                {
                    data.map((val, idx) => (
                        <div key={idx} className={`${idx % 2 === 1 ? styles.colored : ""} ${styles.notebook} `}>
                            <Link to={`/notebooks/${val.toLowerCase().replace(" ", "-")}`}>
                                {val}
                            </Link>
                            
                            <p>delete</p>
                        </div>
                    ))
                }
            </div>
            
        </div>
        
    </>

}
