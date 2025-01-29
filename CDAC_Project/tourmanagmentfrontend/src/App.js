import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AdminDashboardPage from "./screens/AdminDashboardPage/AdminDashboard";
import BookTour from "./BookTour";
import Home from "./screens/Home";
import Login from "./screens/Login";
import ResetPassword from "./screens/ResetPassword";
import SignUp from "./screens/SignUp";
import TourDetails from "./screens/TourDetails";
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
        <Route path="/tour-details/:id" element={<TourDetails />} />
        <Route path="/book-tour/:tourId" element={<BookTour />} />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
