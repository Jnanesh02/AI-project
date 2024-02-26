import React, { useState, useEffect } from "react";
import "./EditModal.css";

function EditModal({ plan, onSave, onCancel, setOpenModal }) {
  // const [name, setName] = useState('');
  // const [price, setPrice] = useState('');
  // const [features,setFeatures]=useState('');
  const initialState = {
    id: "",
    subscriptionPlanName: "",
    price: "",
    features: "",
  };

  const [formdata, setFormData] = useState(initialState);

  useEffect(() => {
    if (plan) {
      setFormData(plan);
      console.log("124", formdata);
    }
  }, [plan]);
  const onChangeInput = (event) => {
    const { name, value } = event.target;
    event.preventDefault();
    setFormData((prevDate) => ({
      ...prevDate,
      [name]: value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(formdata);
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
              <input
                type="text"
                id="name"
                placeholder="Plan Name"
                name="subscriptionPlanName"
                value={formdata.subscriptionPlanName}
                onChange={onChangeInput}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                id="price"
                name="price"
                placeholder="Price ($)"
                value={formdata.price}
                onChange={onChangeInput}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                id="price"
                name="features"
                placeholder="Features"
                value={formdata.features}
                onChange={onChangeInput}
              />
            </div>
            <div className="footer">
              <button type="button" onClick={onCancel} id="cancelBtn">
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
