import React from "react";
import "./WhyUs.css";

const WhyUs = () => {
  return (
    <div className="container py-5">
      <div className="row align-items-center">
        {/* Images Section */}
        <div className="col-lg-6">
          <div className="row g-4">
            {/* First column: Two stacked images */}
            <div className="col-6">
              <img
                src="https://images.unsplash.com/photo-1627895457805-c7bf42cb9873?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                alt="Scenic View 1"
                className="img-fluid rounded-3 mb-3"
              />
              <img
                src="https://images.unsplash.com/photo-1544750040-4ea9b8a27d38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
                alt="Scenic View 2"
                className="img-fluid rounded-3"
              />
            </div>
            {/* Second column: Single larger image */}
            <div className="col-6 d-flex align-items-center">
              <img
                src="https://images.unsplash.com/photo-1594993877167-a08f13013dc3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80"
                alt="Scenic View 3"
                className="img-fluid rounded-3"
              />
            </div>
          </div>
        </div>
        {/* Text Section */}
        <div className="col-lg-6">
          <div className="mt-4 mt-lg-0">
            <span className="text-primary mb-2 d-block fw-semibold">
              Why Choose Us
            </span>
            <h2 className="text-dark mb-4 fw-bold display-5">
              Explore, Experience, and Enjoy
            </h2>
            <p className="text-secondary mb-3 text-justify">
              Every journey is an opportunity to explore, connect, and create
              unforgettable memories. With expertise and passion, we design
              personalized travel experiences that bring your dreams to life.
            </p>
            <p className="text-secondary mb-3 text-justify">
              From breathtaking destinations to personalized itineraries, our
              team ensures a seamless and stress-free travel experience.
              Discover hidden gems, connect with local cultures, and create
              memories that last a lifetime.
            </p>
            <ul className="text-secondary mb-3 text-justify">
              <li>Expert guides to enrich your adventures</li>
              <li>Comprehensive planning for hassle-free travel</li>
              <li>Affordable prices with premium service</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
