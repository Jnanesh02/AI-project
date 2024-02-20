import React, { useState, useEffect } from "react";
import "./EditModal.css";

function EditModal({ plan, onSave, onCancel, setOpenModal }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (plan) {
      setName(plan.name);
      setPrice(plan.price);
    }
  }, [plan]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(plan.id, name, price);
    setOpenModal(false);
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={onCancel}>X</button>
        </div>
        <div className="title">
          <h1>Edit Plan</h1>
        </div>
        <div className="body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <input
                type="text"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="footer">
              <button
                type="button"
                onClick={onCancel}
                id="cancelBtn"
              >
                Cancel
              </button>
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
