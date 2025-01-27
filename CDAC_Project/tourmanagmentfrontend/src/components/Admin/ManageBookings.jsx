import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const [error, setError] = useState("");

  // Fetch bookings data from the backend
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("/api/bookings"); // Replace with your backend endpoint
        setBookings(response.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to fetch bookings.");
      }
    };

    fetchBookings();
  }, []);

  // Handle approve booking
  const handleApproveBooking = async (id) => {
    try {
      const response = await axios.put(`/api/bookings/${id}`, {
        status: "Approved",
      });
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === id ? { ...booking, status: "Approved" } : booking
        )
      );
    } catch (err) {
      console.error("Error approving booking:", err);
      setError("Failed to approve booking.");
    }
  };

  // Handle cancel booking
  const handleCancelBooking = async (id) => {
    try {
      const response = await axios.put(`/api/bookings/${id}`, {
        status: "Cancelled",
      });
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === id ? { ...booking, status: "Cancelled" } : booking
        )
      );
    } catch (err) {
      console.error("Error cancelling booking:", err);
      setError("Failed to cancel booking.");
    }
  };

  // Handle edit booking
  const handleEditBooking = async () => {
    if (!editingBooking) return;

    try {
      const response = await axios.put(`/api/bookings/${editingBooking.id}`, editingBooking);
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === editingBooking.id ? response.data : booking
        )
      );
      setEditingBooking(null); // Clear editing state
      setError(""); // Clear error
    } catch (err) {
      console.error("Error editing booking:", err);
      setError("Failed to update booking.");
    }
  };

  // Handle delete booking
  const handleDeleteBooking = async (id) => {
    try {
      await axios.delete(`/api/bookings/${id}`);
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== id)
      );
    } catch (err) {
      console.error("Error deleting booking:", err);
      setError("Failed to delete booking.");
    }
  };

  // Handle field change when editing a booking
  const handleFieldChange = (e, field) => {
    setEditingBooking({ ...editingBooking, [field]: e.target.value });
  };

  return (
    <div>
      <h3>Manage Bookings</h3>
      {error && <div className="error-message">{error}</div>}
      <h4>Existing Bookings</h4>
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Tour Name</th>
            <th>Booking Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.customerName}</td>
                <td>{booking.tourName}</td>
                <td>{booking.bookingDate}</td>
                <td>{booking.status}</td>
                <td>
                  {booking.status !== "Cancelled" && booking.status !== "Approved" && (
                    <>
                      <button
                        className="approve-btn"
                        onClick={() => handleApproveBooking(booking.id)}
                      >
                        Approve
                      </button>
                      <button
                        className="cancel-btn"
                        onClick={() => handleCancelBooking(booking.id)}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  {booking.status !== "Cancelled" && (
                    <button
                      className="edit-btn"
                      onClick={() => setEditingBooking(booking)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteBooking(booking.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No bookings available</td>
            </tr>
          )}
        </tbody>
      </table>

      {editingBooking && (
        <div>
          <h3>Edit Booking</h3>
          <input
            type="text"
            placeholder="Customer Name"
            value={editingBooking.customerName}
            onChange={(e) =>
              handleFieldChange(e, "customerName")
            }
          />
          <input
            type="text"
            placeholder="Tour Name"
            value={editingBooking.tourName}
            onChange={(e) =>
              handleFieldChange(e, "tourName")
            }
          />
          <input
            type="date"
            placeholder="Booking Date"
            value={editingBooking.bookingDate}
            onChange={(e) =>
              handleFieldChange(e, "bookingDate")
            }
          />
          <button onClick={handleEditBooking}>Update Booking</button>
        </div>
      )}
    </div>
  );
};

export default ManageBookings;
