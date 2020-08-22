import React from 'react';
import styles from './Notebook.module.scss';
import { Link, useParams } from 'react-router-dom';

export default function Notebook() {
    const { book } = useParams();
    const notes = [
        "hello",
        "there",
        "General",
        "kenobi",
        "ehh"
    ]


    function search(e) {
        e.preventDefault();
    }


    console.log(book.replace("-", " "));


    return <>
        <div className={styles.header}>
            <div className={styles.title}>
                <h1>{book.replace("-", " ")}</h1>
            </div>
            <Link to={"/exam-mode"}>
                <button className="button is-light is-primary">Exam mode</button>
            </Link>
        </div>
        <form onSubmit={search} className={styles.search}>
            <div className="field is-grouped">
                <div className="control">
                    <input className="input" name="refine" placeholder="Search notes..." />
                </div>
                <div className="control">
                    <button className="button is-primary" type="submit">Search</button>
                </div>
            </div>
        </form>  
        <div className={styles.notes}>
            <div className={styles.add}>
                <span>+</span>&nbsp;Add
            </div>
            {
                notes.map((val, idx) => (
                    <div key={idx} className={`${idx % 2 === 0 ? styles.colored : ""} ${styles.note}`}>
                        <Link>
                            {val}
                        </Link>
                        <div className={styles.manage}>
                            <span>edit</span>
                            <span>delete</span>
                        </div>
                    </div>
                ))
            }
        </div>
    </>
}
