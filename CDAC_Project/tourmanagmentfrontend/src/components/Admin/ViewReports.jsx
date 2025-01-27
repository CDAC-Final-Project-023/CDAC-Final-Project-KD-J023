import React, { useEffect, useState } from "react";

// import "./ViewReports.css";

const ViewReports = () => {
  const [totalCollections, setTotalCollections] = useState(0);
  const [ratings, setRatings] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch total collections
    fetch("/api/reports/collections")
      .then((response) => response.json())
      .then((data) => setTotalCollections(data.totalCollections))
      .catch((error) => console.error("Error fetching total collections:", error));

    // Fetch ratings
    fetch("/api/reports/ratings")
      .then((response) => response.json())
      .then((data) => setRatings(data.ratings))
      .catch((error) => console.error("Error fetching ratings:", error));

    // Fetch bookings
    fetch("/api/reports/bookings")
      .then((response) => response.json())
      .then((data) => setBookings(data.bookings))
      .catch((error) => console.error("Error fetching bookings:", error));
  }, []);

  return (
    <div className="view-reports">
      <h1>Admin View Reports</h1>

      <div className="report-section">
        <h2>Total Collections</h2>
        <div className="collection-card">
          <h3>₹{totalCollections.toLocaleString()}</h3>
        </div>
      </div>

      <div className="report-section">
        <h2>Ratings</h2>
        {ratings.length > 0 ? (
          <table className="ratings-table">
            <thead>
              <tr>
                <th>Tour Name</th>
                <th>Average Rating</th>
                <th>Total Reviews</th>
              </tr>
            </thead>
            <tbody>
              {ratings.map((rating) => (
                <tr key={rating.tourId}>
                  <td>{rating.tourName}</td>
                  <td>{rating.averageRating.toFixed(1)}</td>
                  <td>{rating.totalReviews}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No ratings available</p>
        )}
      </div>

      <div className="report-section">
        <h2>Bookings</h2>
        {bookings.length > 0 ? (
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer Name</th>
                <th>Tour Name</th>
                <th>Booking Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.customerName}</td>
                  <td>{booking.tourName}</td>
                  <td>{booking.bookingDate}</td>
                  <td>{booking.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No bookings available</p>
        )}
      </div>
    </div>
  );
};

export default ViewReports;
