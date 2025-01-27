import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./LoginPage.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Mock validation
    if (email === "sanket@gmail.com" && password === "12345") {
      toast.success("Login successful!");
      setTimeout(() => navigate("/home"), 1000); // Redirect to home page after success
    } else {
      toast.error("Invalid credentials. Please do register.");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row shadow-lg bg-white rounded overflow-hidden" style={{ width: "90%", maxWidth: "900px" }}>
        {/* Left Section with Image and Branding */}
        <div
          className="col-md-6 p-4 d-flex flex-column justify-content-center align-items-center text-center text-white position-relative"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Add a semi-transparent overlay */}
          <div
            className="position-absolute w-100 h-100"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          ></div>

          {/* Content */}
          <div className="z-index-1">
            <h1 className="brand-title">Sunbeam Tours</h1>
            <p className="brand-subtitle mt-3">
              Travel is the only purchase that enriches you in ways beyond material wealth.
            </p>
          </div>
        </div>

        {/* Right Section with Form */}
        <div className="col-md-6 p-4 d-flex flex-column justify-content-center">
          <h2 className="form-title text-center mb-3">Welcome to MyTours</h2>
          <p className="text-center text-muted mb-4">Login with your email</p>

          <form onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Login Button */}
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>

          {/* Links */}
          <div className="text-center mt-3">
            <a
              href="/forgot-password"
              className="text-primary"
              onClick={(e) => {
                e.preventDefault();
                navigate("/resetpassword");
              }}
            >
              Forgot your password?
            </a>
          </div>

        
          <div className="text-center my-3">
            <span className="text-muted"></span>
            <p></p>
          </div>

          {/* Registration Link */}
          <p className="text-center mt-3">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-primary"
              onClick={(e) => {
                e.preventDefault();
                navigate("/signup");
              }}
            >
              Register Now
            </a>
          </p>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
