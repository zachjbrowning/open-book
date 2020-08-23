import React from 'react';
import styles from './Notebook.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { set_note, unset_note, edit_note } from '../../../lib/redux/actions/activeAction';

export default function Notebook() {
    const dispatch = useDispatch();
    const { book } = useParams();
    const collection = useSelector(state => state.collection);
    let notebook = false;
    for (var name of Object.keys(collection)) {
        if (name.toLowerCase() === book.replace("-", " ")) {
            notebook = name;
            break;
        }
    }
    
    if (!notebook) throw new Error("URL DIDN'tMATCH THE NOTEBOOK");
    
    const active = useSelector(state => state.active);
    
    
    const notes = collection[notebook];


    const note = false
    function search(e) {
        e.preventDefault();
    }




    return <>
        <div className={styles.header}>
            <div className={styles.title}>
                <h1>{book.replace("-", " ")}</h1>
            </div>
            <Link to={"/exam-mode"}>
                <button className="button is-primary">Exam mode</button>
            </Link>
        </div>
    { 
        !active.note && !active.edit ? <>

        <form onSubmit={search} className={styles.search}>
            <div className="field is-grouped">
                <div className="control">
                    <input className="input" name="refine" placeholder="Search notes..." />
                </div>
                <div className="control">
                    <button className="button is-primary is-light" type="submit">Search</button>
                </div>
            </div>
        </form>  
        <div className={styles.notes}>
            <div onClick={() => dispatch(edit_note(false))} className={styles.add}>
                <span>+</span>&nbsp;Add
            </div>
            {
                Object.keys(notes).map((val, idx) => (
                    <div key={idx} className={`${idx % 2 === 0 ? styles.colored : ""} ${styles.note}`}>
                        <a onClick={() => dispatch(set_note(val))}>
                            {val}
                        </a>
                        <span>
                            delete
                        </span>
                    </div>
                ))
            }
        </div>
        </>
        : 

        <div className={styles.popup}>
            {
                active.edit ? <> 
                    <div className="field control">
                        <label className="label">Title</label>
                        <input id="title-input" defaultValue={note.title} className="input" />
                    </div>
                    <div className="control">
                        <label className="label">Keywords</label>
                        <form className="field is-grouped">
                            <div className="control">
                                <input className="input" placeholder="keyword..." name="keyword"/>
                            </div>
                            <div className="control">
                                <button type="submit" className="button is-primary is-light">Add</button>
                            </div>
                        </form>
                        <div className="field tags">
                            {
                                note.keywords.map((keyword, idx) => (
                                    <span className="tag" key={idx}>
                                        {keyword}
                                        <button onClick={() => removeKey(keyword)} className="delete is-small" />
                                    </span>
                                ))
                            }
                        </div>
                    </div>
                    <div className="field control">
                        <label className="label">Note</label>
                        <textarea id="notes-input" className="textarea" defaultValue={note.notes} />
                    </div>
                    <div className="field is-grouped control">
                    <div className="control">
                            <button className="button is-primary" >Save</button>
                        </div>
                        <div className="control">
                            <button className="button is-primary is-light" >Delete</button>
                        </div>
                    </div>

                </> : <>
                    <h5 className={`${styles.name} title is-5`}>{note.title}</h5>
                    <div className={`tags ${styles.tags}`}>
                        {note.keywords.map((keyword, idx) => (
                            <span key={idx} className="tag is-dark">{keyword}</span>
                            ))}
                    </div>
                    <div className={styles.text}>
                        {note.notes}
                    </div>
                    <svg onClick={() => dispatch(edit_note(active.note))} className={styles.edit} viewBox="0 0 8192 8192">
                        <path d="M1696.9,7173.1c-180.1,0-360.3-3.2-540.3,1.4c-80.8,2.1-106.5-26.9-105.8-107.7c3.2-364.4,2.7-728.8,0.2-1093.2
                            c-0.4-63.7,22.2-107.9,65.3-151.4c1200-1211.8,2399.5-2424.2,3597.2-3638.4c62.8-63.7,99.6-57.3,158.9,3.4
                            c370.4,379.4,742.7,757,1118.7,1130.6c65.3,64.9,53.6,98.3-4.4,156.8C4789.1,4682.5,3593,5892.1,2398,7102.7
                            c-50.8,51.5-102.6,73.4-174,71.8C2048.4,7170.4,1872.6,7173.2,1696.9,7173.1z"/>
                        <path d="M7141.2,2166.3c-2.2,98.8-44.2,180.8-110.8,249.1c-178.9,183.5-361.2,363.6-538.9,548.2c-48.5,50.4-80,48.3-128.2-0.8
                            c-380.6-387.9-762.7-774.3-1146.6-1158.8c-49.4-49.5-48.8-80.3,0.3-128.6c182.7-179.6,358.3-366.6,543.3-543.7
                            c163.5-156.5,353.4-151.5,515.2,9.1c250.8,248.9,497.6,502,746.3,753.1C7096.5,1969.3,7141.9,2057.3,7141.2,2166.3z"/>
                    </svg>
                </>
            }
            <svg onClick={() => dispatch(unset_note())} className={styles.close} viewBox="0 0 8192 8192">
                <path d="M3497.2,4084.8c-30-32.3-61.1-68.2-94.6-101.7c-686.9-687-1372.1-1375.7-2063.3-2058.3c-96.1-94.9-119.1-152.4-4.2-247.5
                    c122.8-101.7,234.8-218.4,340.1-338.6c87-99.2,144.8-99.4,240.3-2.8c667.9,675.7,1341.3,1346.1,2014.3,2016.7
                    c188.6,187.9,139.5,189.4,324,5.6c673-670.7,1346.8-1340.6,2014-2017c101.4-102.8,160.3-103,251.9,2.6
                    c108.1,124.7,226,242.7,350.8,350.7c95.5,82.6,78,131.6-3.9,212.7c-686.5,679.8-1364.9,1367.8-2054.9,2044
                    c-124.4,121.9-108.3,182.1,5.8,294.4c684.7,674,1360,1357.6,2043.2,2033c89.4,88.4,95.8,140.3-0.3,224
                    c-124.5,108.4-242.7,226-350.8,350.7c-86.9,100.1-142.1,98.9-236.8,2.8c-561.7-570.5-1130.4-1134.2-1696.7-1700.2
                    c-120.8-120.7-250.8-233.8-359.6-364.6c-97.1-116.7-154.5-89.6-248.5,5.5c-675.7,683.1-1359.9,1357.7-2033.7,2042.5
                    c-110.3,112.1-172.9,115.5-271.9-2.7c-102.5-122.3-218.8-234.5-339.2-339.6c-91.1-79.5-86.2-127.9-0.5-212.6
                    c694.6-686.8,1384.1-1378.8,2074.4-2069.9C3433.9,4177.7,3482.4,4148.7,3497.2,4084.8z"/>
            </svg>
        </div>
    }
    </>
}
