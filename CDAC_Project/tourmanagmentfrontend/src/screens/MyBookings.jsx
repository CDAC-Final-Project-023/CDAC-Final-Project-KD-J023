import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MyBookings.css";
import axios from "axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/bookings/user/1") // Change user ID dynamically
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => console.error("Error fetching bookings:", error));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center">My Bookings</h2>
      <div className="row">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div className="col-md-4" key={booking.id}>
              <div className="card mb-4 shadow-sm">
                <img
                  src={booking.tourImage}
                  className="card-img-top"
                  alt={booking.tourName}
                />
                <div className="card-body">
                  <h5 className="card-title">{booking.tourName}</h5>
                  <p className="card-text">
                    <strong>Location:</strong> {booking.location}
                    <br />
                    <strong>Date:</strong> {booking.date}
                    <br />
                    <strong>Price:</strong> ${booking.price}
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/add-review/${booking.id}`)}
                  >
                    Write Review
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
