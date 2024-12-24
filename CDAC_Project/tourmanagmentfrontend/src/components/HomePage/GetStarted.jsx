import React from "react";
import "./GetStarted.css"; // Import the new CSS file

const GetStarted = () => {
  return (
    <div className="container py-5">
      <div className="row align-items-center g-5">
        <div className="col-lg-6 text-center text-lg-start">
          <h1 className="display-4 fw-bold">Explore</h1>
          <h1 className="display-4 fw-bold">the Wonders in</h1>
          <h1 className="display-4 fw-bold text-primary">India</h1>

          <p className="mt-4">
            India is a land of various cultures and a rich heritage. It is the
            seventh-largest country by area and the second-most populous country
            globally.
          </p>
          <button className="btn btn-dark btn-long mt-4">Get started</button>
        </div>
        <div className="col-lg-6">
          <img
            src="https://img.freepik.com/premium-photo/palm-tree-jungle-philippines-concept-about-wanderlust-tropical-travels-swinging-river-people-having-fun_186382-1220.jpg?w=1060"
            alt="heroimg"
            className="img-fluid rounded-3"
          />
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
