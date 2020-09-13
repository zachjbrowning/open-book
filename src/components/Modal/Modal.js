import React from 'react';
import styles from './Modal.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { unset_modal, unset_warning } from '../../../lib/redux/actions/modalAction';

/*
    MODAL COMPONENT
    Utility component that remains hidden until something is loaded into it.
    Rather than each component that requires a modal have their own, a single
    one is reused via Redux. 
    The state holds : 
     - title : title for modal (optional)
     - content : text to be displayed (req)
     - warning : warning text to be displayed at top of modal. 
        Can be added removed while modal is opened. (optional)
     - func : funciton that is executed when modal is submitted.
        Func returns true to close modal, false to keep open. Inside
        this func, warning could be set, info retrieved from form etc.
     - buttons : yes : word for the yes button 
                  no : word for the no button

*/
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
                <button onClick={sendIt} className="button is-primary">{modal.buttons?.yes ? modal.buttons.yes : "Ok"}</button>
            </div>
            {
                !modal.buttons || modal.buttons?.no ? 
                <div className="control">
                    <button onClick={toggle} className="button is-light is-primary">{modal.buttons?.no ? modal.buttons.no : "Cancel"}</button>
                </div>
                : ""
            }
        </div>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={toggle} />
    </div>
    
}
