import React from 'react'
import styles from './Notebook.module.scss';
import { useSelector, useDispatch } from 'react-redux';

import Searched from '../Utils/Searched';
import View from './View';
import { useTransition, animated } from 'react-spring';


/*
    EXAM COMPONENT
    Used for exam mode. Search bar is in nav so just contains searched items and the note popup
    Exists within the Notebook component.
*/
export default function Exam() {
    const searched = useSelector(state => state.query.searched);
    const active = useSelector(state => state.active);
    const collection = useSelector(state => state.collection);
    

    const transitions = useTransition(active.popup, null, {
        from : { opacity : 0, transform : "translateY(10rem)"},
        enter : { opacity : 1, transform : "translateY(0rem)" },
        leave : { opacity : 0, transform : "translateY(10rem)" },
    })


    return <>
        {
            searched ? <Searched /> : ""
        }
        {
            transitions.map(({ item, key, props}) => (
                item && <animated.div key={key} style={props} className={styles.slideup}>
                    <View title={active.note} note={collection[active.notebook].notes[active.note]} restricted={true} />
                </animated.div> 
            ))
        }

    </>
}
