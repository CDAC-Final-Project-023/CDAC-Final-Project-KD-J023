import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");

  const handleResetPassword = (e) => {
    e.preventDefault();
    // Add logic to send a password reset email
    console.log("Reset email sent to:", email);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Reset Password</h2>
        <form onSubmit={handleResetPassword}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
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
          <button type="submit" className="btn btn-primary w-100">
            Reset Password
          </button>
        </form>
        <p className="text-center mt-3">
          Remember your password? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
