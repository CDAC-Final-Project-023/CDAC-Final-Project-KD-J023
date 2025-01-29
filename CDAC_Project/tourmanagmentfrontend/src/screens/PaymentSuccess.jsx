import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import successAnimation from "../animations/success-checkmark.json";
import "./PaymentSuccess.css";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home page after 5 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [navigate]);

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
