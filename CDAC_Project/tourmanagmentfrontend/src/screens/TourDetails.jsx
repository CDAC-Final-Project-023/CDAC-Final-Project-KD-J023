import "./TourDetails.css";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/BetaNav";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function TourDetails() {
  const { id } = useParams(); // Retrieve ID from route
  const [tourDetails, setTourDetails] = useState(null);

  useEffect(() => {
    // Simulating an API call (replace with real API URL)
    fetch(`/api/tours/${id}`)
      .then((response) => response.json())
      .then((data) => setTourDetails(data))
      .catch((error) => console.error("Error fetching tour details:", error));
  }, [id]);

  if (!tourDetails) {
    return <p>Loading tour details...</p>;
  }

  return (
    <div className="tour-details-container">
      <Navbar />
      <div className="tour-details-content">
        <h1>{tourDetails.title}</h1>
        <p>{tourDetails.description}</p>
        <div className="tour-images">
          {tourDetails.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Tour Image ${index + 1}`}
              className="tour-image"
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TourDetails;
