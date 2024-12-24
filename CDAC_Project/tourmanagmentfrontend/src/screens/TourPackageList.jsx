import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

const TourPackagesList = ({ category, packages }) => {
  return (
    <div className="container mt-4">
      {/* Header */}
      <header className="text-center mb-4">
        <h1 className="fw-bold">{category} Tour Packages</h1>
        <p className="text-muted">
          Explore the best tour packages for {category} in India.
        </p>
      </header>

      {/* Package List */}
      <main className="row g-4">
        {packages && packages.length > 0 ? (
          packages.map((pkg, index) => (
            <div key={index} className="col-12 col-sm-6 col-lg-4">
              <div className="card h-100">
                <div
                  className="card-img-top bg-secondary text-white d-flex justify-content-center align-items-center"
                  style={{
                    height: "200px",
                    backgroundImage: `url(${pkg.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {!pkg.image && "Image Not Available"}
                </div>
                <div className="card-body">
                  <h5 className="card-title">{pkg.name}</h5>
                  <p className="card-text text-truncate">
                    {pkg.description || "No description available."}
                  </p>
                  <p className="text-primary fw-bold">Price: ₹{pkg.price}</p>
                  <a href={pkg.link} className="btn btn-outline-dark btn-sm">
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p className="text-muted">No packages available for this category.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default TourPackagesList;
