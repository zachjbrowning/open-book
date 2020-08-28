import React from 'react';
import styles from './Modal.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { unset_modal, unset_warning } from '../../../lib/redux/actions/modalAction';


export default function Modal() {
    const dispatch = useDispatch();
    const modal = useSelector(state => state.modal);
    const toggle = () => {
        dispatch(unset_modal());
    }
    //NOTE : func from modal returns true if the modal is to be closed, false otherwise
    const sendIt = () => {
        if (modal.func()) toggle();
    }


    return <div className={`modal ${modal.content ? 'is-active' : ""}`} >
      <div className="modal-background" onClick={toggle} />
      <div className={`modal-content ${styles.box}`}>
        {
            modal.title ? 
            <h3 className={styles.title}>{modal.title}</h3>
            : ""
        }
        {
            modal.warning ? 
            <div className="notification is-primary">
                <button className="delete" onClick={() => dispatch(unset_warning())} />
                {modal.warning}
            </div>
            : ""
        }
        {
            modal.content ? modal.content : ""
        }
        <div className={`field is-grouped ${styles.lower}`}>
            <div className="control">
                <button onClick={sendIt} className="button is-primary">Ok</button>
            </div>
            <div className="control">
                <button onClick={toggle} className="button is-light is-primary">Cancel</button>
            </div>
        </div>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={toggle} />
    </div>
    
}
