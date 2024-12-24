import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

const TourPackages = () => {
  return (
    <div className="container mt-4">
      {/* Search Section */}
      <header className="row justify-content-center mb-4">
        <div className="col-12 col-md-8 col-lg-6 d-flex">
          <input
            type="text"
            placeholder="Search Package"
            className="form-control me-2"
          />
          <button className="btn btn-dark">Search</button>
        </div>
      </header>

      {/* Categories Section */}
      <main className="row g-4">
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="card h-100 text-center">
            <div
              className="card-img-top bg-secondary text-white d-flex justify-content-center align-items-center"
              style={{ height: "150px" }}
            >
              Image
            </div>
            <div className="card-body">
              <h5 className="card-title">Northside Tours</h5>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="card h-100 text-center">
            <div
              className="card-img-top bg-secondary text-white d-flex justify-content-center align-items-center"
              style={{ height: "150px" }}
            >
              Image
            </div>
            <div className="card-body">
              <h5 className="card-title">Southside Tours</h5>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="card h-100 text-center">
            <div
              className="card-img-top bg-secondary text-white d-flex justify-content-center align-items-center"
              style={{ height: "150px" }}
            >
              Image
            </div>
            <div className="card-body">
              <h5 className="card-title">Eastside Tours</h5>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="card h-100 text-center">
            <div
              className="card-img-top bg-secondary text-white d-flex justify-content-center align-items-center"
              style={{ height: "150px" }}
            >
              Image
            </div>
            <div className="card-body">
              <h5 className="card-title">Westside Tours</h5>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TourPackages;
