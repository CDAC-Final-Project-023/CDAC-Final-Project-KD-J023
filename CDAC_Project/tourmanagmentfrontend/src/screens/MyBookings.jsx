import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { config } from "../services/config";
import StarRating from "../components/StarRating";
import "./MyBookings.css"; // Custom CSS
import Navbar from "../components/navbar/BetaNav";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      axios
        .get(`${config.serverUrl}/bookings/user/${user.id}`)
        .then((response) => {
          setBookings(response.data);
        })
        .catch((error) => {
          console.error("Error fetching bookings:", error);
        });
    }
  }, [user]);

  const handleTileClick = (tourId) => {
    navigate(`/tour-details/${tourId}`);
  };

  return (
    <>
      <Navbar />
      <div className="container my-5 py-3">
        <h2 className="text-center mb-4">My Bookings</h2>
        <div className="row">
          {bookings.length > 0 ? (
            <div className="col-md-12">
              {bookings.map((booking) => (
                <div
                  className="booking-card d-flex align-items-center shadow rounded p-3 mb-4"
                  key={booking.id}
                  style={{ cursor: "pointer" }}>
                  <div
                    className="booking-image"
                    onClick={() => handleTileClick(booking.tour.id)}>
                    <img
                      src={`${config.serverUrl}/uploads/${booking.tour.photo}`}
                      alt={booking.tour.title}
                      className="img-fluid rounded"
                    />
                  </div>
                  <div
                    className="booking-details flex-grow-1 px-4"
                    onClick={() => handleTileClick(booking.tour.id)}>
                    <h5 className="booking-title mb-2">{booking.tour.title}</h5>
                    <p className="booking-description mb-1 text-muted">
                      {booking.tour.description}
                    </p>
                    <p className="mb-1">
                      <strong>Status:</strong> {booking.status}
                    </p>
                    <p className="mb-1">
                      <strong>Price:</strong> ₹{booking.tour.price}
                    </p>
                  </div>
                  <div className="booking-actions text-center">
                    <StarRating tourId={booking.tour.id} userId={user.id} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center">No bookings found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyBookings;
