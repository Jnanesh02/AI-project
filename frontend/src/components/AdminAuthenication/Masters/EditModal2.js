import React, { useState, useEffect } from "react";
import "./EditModal.css";

function EditModal2({ plan, onSave, onCancel }) {
  console.log("plan in editmodal", plan);
  const [formData, setFormData] = useState({
    _id: plan?._id || "",
    tone: plan ? plan.tone : "",
    description: plan ? plan.description : "",
  });

  useEffect(() => {
    if (plan) {
      setFormData(plan);
    }
  }, [plan]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("inside handleChange", name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAutoResize = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("inside handlesubmit of  edit modal", plan);
    onSave(plan?._id, formData.tone, formData.description);
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={onCancel}>X</button>
        </div>
        <div className="title">
          <h1>{plan ? "Edit Tone" : "Create New Tone"}</h1>
        </div>
        <div className="body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="tone"
                placeholder="Tone Name"
                value={formData.tone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                onInput={handleAutoResize}
                style={{ width: "100%", height: "100px" }}
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

export default EditModal2;
