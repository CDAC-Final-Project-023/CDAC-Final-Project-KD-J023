import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AboutUs from "./screens/AboutUs";
import AdminDashboardPage from "./screens/AdminDashboardPage/AdminDashboard";
import ContactUs from "./screens/ContactUs";
import Home from "./screens/Home";
import Login from "./screens/Login";
import PaymentSuccess from "./screens/PaymentSuccess";
import PurchasePackage from "./screens/PurchasePackage";
import RequestReset from "./screens/RequestResetPassword";
import ResetPassword from "./screens/ResetPassword";
import SignUp from "./screens/SignUp";
import TourDetails from "./screens/TourDetails";
import TourPackage from "./screens/TourPackage";
import TourPackagesList from "./screens/TourPackageList";
import UpdateProfile from "./screens/UpdateProfile";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "./context/authContext";

function App() {
  return (
    <div className="app-container">
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/tourPackage" element={<TourPackage />} />
          <Route path="/tourPackageList" element={<TourPackagesList />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/requestReset" element={<RequestReset />} />

          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/purchase-package/:id" element={<PurchasePackage />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/tour-details/:id" element={<TourDetails />} />
          <Route path="/UpdateProfile" element={<UpdateProfile />} />
        </Routes>

        <ToastContainer />
      </AuthContextProvider>
    </div>
  );
}

export default App;
