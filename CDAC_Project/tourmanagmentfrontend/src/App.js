import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AdminDashboardPage from "./screens/AdminDashboardPage/AdminDashboard";
import Home from "./screens/Home";
import Login from "./screens/Login";
import ResetPassword from "./screens/ResetPassword";
import SignUp from "./screens/SignUp";
import TourDetails from "./screens/TourDetails";
import TourPackage from "./screens/TourPackage";
import TourPackagesList from "./screens/TourPackageList";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PurchasePackage from "./screens/PurchasePackage";
import PaymentSuccess from "./screens/PaymentSuccess";
import ContactUs from "./screens/ContactUs";
import AboutUs from "./screens/AboutUs";
import { AuthContextProvider } from "./context/authContext";
import UpdateProfile from "./screens/UpdateProfile";
import ComingSoon from "./components/soon/ComingSoon";

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
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/purchase-package/:tourId" element={<PurchasePackage />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/tour-details/:id" element={<TourDetails />} />
          <Route path="/UpdateProfile" element={<UpdateProfile />} />
          <Route path="/coming-soon"  element={<ComingSoon />} />
         

        </Routes>

        <ToastContainer />
      </AuthContextProvider>
    </div>
  );
}

export default App;
