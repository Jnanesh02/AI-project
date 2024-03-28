import React from 'react';
import "./Table.css";

function ConfirmationModal({ onConfirmDelete, onCancel }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button class="btn-cross" onClick={onCancel}>X</button>
        </div>
        <div className="title">
          <h1>Delete Plan</h1>
        </div>
        <div className="body">
          <p>Are you sure you want to delete this plan?</p>
        </div>
        <div className="footer">
          <button class="cancel-footer-btn" onClick={onCancel} id="cancelBtn">Cancel</button>
          <button class="cancel-footer-btn n" onClick={onConfirmDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
