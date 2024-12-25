import "react-toastify/dist/ReactToastify.css";
import "./SignUpPage.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
    
    
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
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
    const { firstName, lastName, email, password } = formData;

    // Simple validation
    if (!firstName || !lastName || !email || !password) {
      toast.error("All fields are required!");
      return;
    }

    // Mock submission and redirection
    toast.success("Signup successful!");
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div
      className="container-fluid vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: "url('https://via.placeholder.com/1920x1080')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="row shadow-lg bg-white rounded overflow-hidden"
        style={{
          width: "90%",
          maxWidth: "900px",
          animation: "fadeIn 1s ease-in-out",
        }}
      >
        {/* Left Section with Image and Tagline */}
        <div className="col-md-6 p-4 d-flex flex-column justify-content-center align-items-center text-center bg-primary text-white">
          <h1 className="fw-bold">Join Travelista</h1>
          <p className="mt-3">
            Start your journey with us and explore the world like never before!
          </p>
          <img
            src='https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
            alt="Travel"
            className="img-fluid rounded mt-4 shadow"
            style={{ width: "80%" }}
          />
        </div>

        {/* Right Section with Form */}
        <div className="col-md-6 p-4 d-flex flex-column justify-content-center">
          <h2 className="text-center mb-3">Create an Account</h2>
          <form onSubmit={handleSubmit}>
            {/* First Name */}
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Last Name */}
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Profile Photo */}
            <div className="mb-3">
              <label htmlFor="profilePhoto" className="form-label">
                Profile Photo
              </label>
              <input
                type="file"
                className="form-control"
                id="profilePhoto"
                name="profilePhoto"
                onChange={handleChange}
                required
              />
            </div>

            {/* Signup Button */}
            <button type="submit" className="btn btn-primary w-100">
              Sign Up
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center mt-3">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-primary"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            >
              Log in
            </a>
          </p>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default Signup;
