import React from "react";
import Lottie from "lottie-react";
import animationData from "../../animations/coming-soon.json"; 
import "./ComingSoon.css";

const ComingSoon = () => {
  return (
    <div className="coming-soon-container">
      <Lottie animationData={animationData} className="coming-soon-animation" /> 
      <p className="coming-soon-text">
        We are working hard to bring you this feature. Stay tuned!
      </p>
    </div>
  );
};

export default ComingSoon;
