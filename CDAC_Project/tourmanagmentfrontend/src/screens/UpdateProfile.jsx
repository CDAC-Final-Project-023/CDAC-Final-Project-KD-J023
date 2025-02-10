import "react-toastify/dist/ReactToastify.css";
import "./UpdateProfile.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../components/navbar/BetaNav";

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePhoto: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (!firstName || !lastName || !email) {
      toast.error("First name, last name, and email are required!");
      return;
    }

    if (password && password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    toast.success("Profile updated successfully!");
    setTimeout(() => navigate("/dashboard"), 1500);
  };

  return (
    <div className="update-profile-container">
      <Navbar />
      <div className="update-profile-card">
        <div className="update-profile-right">
          <h2 className="update-profile-form-title">Update Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter new password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="profilePhoto">Profile Photo</label>
              <input
                type="file"
                id="profilePhoto"
                name="profilePhoto"
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="update-profile-btn">Update Profile</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateProfile;
