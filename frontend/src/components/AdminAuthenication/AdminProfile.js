import React, { useEffect, useState } from "react";
import "./AdminStyles/AdminProfile.css"

export  const AdminProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const [originalFormData, setOriginalFormData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    // Dummy data for demonstration
    const dummyData = {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      phoneNumber: "123-456-7890",
      address: "123 Main St, Anytown, USA",
    };

    setFormData(dummyData);
    setOriginalFormData(dummyData);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const toggleEditMode = () => {
    if (editMode) {
      setShowConfirmationModal(true);
    } else {
      setEditMode(!editMode);
      setShowConfirmationModal(false);
    }
  };

  const handleConfirmEdit = async () => {
    setEditMode(!editMode);
    setShowConfirmationModal(false);

    // Dummy update logic
    setUpdateUserSuccess("Profile updated successfully");
    setOriginalFormData({ ...formData });
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setShowConfirmationModal(false);
    setFormData({ ...originalFormData });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setEditMode(false);
  };

  return (
    <>
      <div className="profile-dashboard-header">
        <div className="Profile-Header">
          <h3>My Profile</h3>
        </div>
        <div className="Profile-container">
          <img
            src="https://i.imgur.com/G1pXs7D.jpg"
            alt="Profile"
            className="img-fluid profile-image"
            width="70"
          />
        </div>
      </div>
      <div className="container mt-2 profile-form">
        <h4>Basic Details :</h4>
        <form>
          <div className="row mb-3">
            <div className="col">
              <div className="floating-label">
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  disabled={!editMode}
                />
              </div>
            </div>
            <div className="col">
              <div className="floating-label">
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  disabled={!editMode}
                />
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <div className="floating-label">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  disabled={!editMode}
                />
              </div>
            </div>
            <div className="col">
              <div className="floating-label">
                <input
                  type="text"
                  className="form-control"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  disabled={!editMode}
                />
              </div>
            </div>
          </div>

          <div className="row mb-1">
            <div className="col">
              <div className="floating-label">
                <textarea
                  className="form-control"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                  disabled={!editMode}
                />
              </div>
            </div>
          </div>
          <div className="profile-button-db">
            <button
              type="submit"
              className="btn btn-primary me-2 btn-profile-cancel"
              hidden={!editMode}
              onClick={handleCancel}
            >
              <i className="fa-solid fa-save me-1"></i>
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-profile-save"
              onClick={toggleEditMode}
            >
              {editMode ? (
                <>
                  <i className="fa-solid fa-times me-1"></i>
                  Save
                </>
              ) : (
                <>
                  <i className="fa-solid fa-edit me-1"></i>
                  Edit
                </>
              )}
            </button>
          </div>

          
        </form>
      </div>
    </>
  );
};
