import React from 'react';
import Button from '@material-ui/core/Button';

export default function ConfirmModal(props) {
 
  if(!props.show) {
      return null
  } else {
    return (
        <div className="modal-container show">
            <div className="modal-box confirmation-box">
            <div className="confirmation-content">
                <h3>{ props.title }</h3>
                <p>{ props.qst }</p>
                <div className="confirmation-actions">
                <Button onClick={props.onClose} color="default">
                    Cancel
                </Button>
                <Button onClick={props.onConfirm} color="secondary" autoFocus>
                    Delete
                </Button>
                </div>
            </div>
            </div>
        </div>
      );
  }
}
