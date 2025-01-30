import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import successAnimation from "../animations/success-checkmark.json";
import Loading from "./Loading";
import "./PaymentSuccess.css";

const PaymentSuccess = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading time
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the loading time as needed

    // Redirect to home page after 5 seconds
    const redirectTimer = setTimeout(() => {
      navigate("/");
    }, 7000); // Adjust the total time to include loading time

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(redirectTimer);
    }; // Cleanup timers on unmount
  }, [navigate]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="payment-success-container">
      {/* Animation Section */}
      <div className="animation-container">
        <Lottie animationData={successAnimation} loop={false} autoplay={true} />
      </div>

      {/* Success Message Section */}
      <h2>Payment Successful!</h2>
      <p>
        Thank you for your purchase! We are thrilled to have you on board for
        this amazing journey. A confirmation email has been sent to you.
      </p>
      <p>You will be redirected to the homepage shortly...</p>

      {/* Optional: Add a manual redirect button */}
      <button className="redirect-button" onClick={() => navigate("/")}>
        Go to Homepage
      </button>
    </div>
  );
};

export default PaymentSuccess;
