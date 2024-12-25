import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./screens/Home";
import Login from "./screens/Login";
import React from "react";
import ResetPassword from "./screens/ResetPassword";
import Signup from "./screens/SignUp";
import TourPackage from "./screens/TourPackage";
import TourPackagesList from "./screens/TourPackageList";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./screens/Home";

function App() {
  return (
    <div className="container-fluid">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tourPackage" element={<TourPackage />} />
        <Route path="/tourPackageList" element={<TourPackagesList />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
