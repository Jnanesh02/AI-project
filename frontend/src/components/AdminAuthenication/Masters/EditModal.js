import React, { useState, useEffect } from "react";
import "./EditModal.css";

function EditModal({ plan, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    subscriptionPlanName: plan ? plan.subscriptionPlanName : "",
    price: plan ? plan.price : "",
    features: plan ? plan.features : "",
  });

  useEffect(() => {
    if (plan) {
      setFormData(plan);
    }
  }, [plan]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={onCancel}>X</button>
        </div>
        <div className="title">
          <h1>{plan ? "Edit Plan" : "Create Plan"}</h1>
        </div>
        <div className="body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="subscriptionPlanName"
                placeholder="Plan Name"
                value={formData.subscriptionPlanName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="price"
                placeholder= "Price ($)"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="features"
                placeholder="Features"
                value={formData.features}
                onChange={handleChange}
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

