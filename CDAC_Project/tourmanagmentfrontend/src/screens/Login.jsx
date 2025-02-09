import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./LoginPage.css";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../components/navbar/BetaNav";
import { AuthContext } from "../context/authContext"; // Import AuthContext
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import { config } from "../services/config"; // Import config

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AuthContext); // Use AuthContext
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${config.serverUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json(); // Parse the JSON response
      if (response.ok) {
        toast.success(result.message || "Login successful!");

        // Store the token in session storage
        sessionStorage.setItem("jwtToken", result.token);
        sessionStorage.setItem("user", JSON.stringify(result));

        // Dispatch the user information to the AuthContext
        dispatch({ type: "LOGIN_SUCCESS", payload: result });

        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        toast.error(result.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <Navbar />
      <div
        className="row shadow-lg bg-white rounded overflow-hidden"
        style={{ width: "90%", maxWidth: "900px" }}>
        <div
          className="col-md-6 p-4 d-flex flex-column justify-content-center align-items-center text-center text-white position-relative"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}>
          <div
            className="position-absolute w-100 h-100"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}></div>
          <div className="z-index-1">
            <h1 className="brand-title">Sunbeam Tours</h1>
            <p className="brand-subtitle mt-3">
              Travel is the only purchase that enriches you in ways beyond
              material wealth.
            </p>
          </div>
        </div>
        <div className="col-md-6 p-4 d-flex flex-column justify-content-center">
          <h2 className="form-title text-center mb-3">Welcome to MyTours</h2>
          <p className="text-center text-muted mb-4">Login with your email</p>

          <form onSubmit={handleLogin}>
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

            <div className="mb-3 position-relative">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"} // Toggle input type
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="text-center mt-3">
            <a
              href="/forgot-password"
              className="text-primary"
              onClick={(e) => {
                e.preventDefault();
                navigate("/resetpassword");
              }}>
              Forgot your password?
            </a>
          </div>

          <p className="text-center mt-3">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-primary"
              onClick={(e) => {
                e.preventDefault();
                navigate("/signup");
              }}>
              Register Now
            </a>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
