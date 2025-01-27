import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AdminDashboardPage from "./screens/AdminDashboardPage/AdminDashboard";
import Home from "./screens/Home";
import Login from "./screens/Login";
import ResetPassword from "./screens/ResetPassword";
import SignUp from "./screens/SignUp";
import TourPackage from "./screens/TourPackage";
import TourPackagesList from "./screens/TourPackageList";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <div className="app-container">
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/tourPackage" element={<TourPackage />} />
        <Route path="/tourPackageList" element={<TourPackagesList />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
