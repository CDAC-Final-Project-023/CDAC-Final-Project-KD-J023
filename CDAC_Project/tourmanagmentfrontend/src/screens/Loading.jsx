import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../animations/loading-spinner.json";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading-container">
      <Lottie
        animationData={loadingAnimation}
        loop={true}
        autoplay={true}
        className="loading-animation"
      />
      <p>Loading, please wait...</p>
    </div>
  );
};

export default Loading;
