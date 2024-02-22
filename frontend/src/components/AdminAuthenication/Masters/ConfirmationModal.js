import React from 'react';
import "./Table.css";

function ConfirmationModal({ onConfirmDelete, onCancel }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={onCancel}>X</button>
        </div>
        <div className="title">
          <h1>Delete Plan</h1>
        </div>
        <div className="body">
          <p>Are you sure you want to delete this plan?</p>
        </div>
        <div className="footer">
          <button onClick={onCancel} id="cancelBtn">Cancel</button>
          <button onClick={onConfirmDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
