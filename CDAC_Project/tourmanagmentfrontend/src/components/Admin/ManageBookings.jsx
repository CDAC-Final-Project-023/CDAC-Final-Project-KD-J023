import "./ManageBookings.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [tours, setTours] = useState([]);
    const [editBooking, setEditBooking] = useState(null);

    useEffect(() => {
        fetchBookings();
        fetchTours();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await axios.get("http://localhost:8080/admin/bookings");
            setBookings(response.data || []);
        } catch (error) {
            console.error("Error fetching bookings:", error);
            setBookings([]);
        }
    };

    const fetchTours = async () => {
        try {
            const response = await axios.get("http://localhost:8080/admin/tours");
            setTours(response.data || []);
        } catch (error) {
            console.error("Error fetching tours:", error);
            setTours([]);
        }
    };

    const handleEditClick = (booking) => {
        setEditBooking({ ...booking, tourId: booking.tourId });
    };

    const handleUpdateBooking = async () => {
        if (!editBooking) return;
        try {
            await axios.put(`http://localhost:8080/admin/bookings/${editBooking.id}`, {
                bookingDate: editBooking.bookingDate,
                tourId: editBooking.tourId,
            });
            setEditBooking(null);
            fetchBookings();
        } catch (error) {
            console.error("Error updating booking:", error);
        }
    };

    const handleApproveBooking = async (id) => {
        try {
            await axios.put(`http://localhost:8080/admin/bookings/${id}/approve`);
            fetchBookings();
        } catch (error) {
            console.error("Error approving booking:", error);
        }
    };

    const handleCancelBooking = async (id) => {
        try {
            await axios.put(`http://localhost:8080/admin/bookings/${id}/cancel`);
            fetchBookings();
        } catch (error) {
            console.error("Error cancelling booking:", error);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Manage Bookings</h2>
            <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-black text-white h-12">
    <tr>
        <th className="border border-white p-4">Booking ID</th>
        <th className="border border-white p-4">User Name</th>
        <th className="border border-white p-4">Tour Name</th>
        <th className="border border-white p-4">Booking Date</th>
        <th className="border border-white p-4">Status</th>
        <th className="border border-white p-4">Actions</th>
    </tr>
</thead>


                <tbody>
                    {bookings.length > 0 ? (
                        bookings.map((booking) => (
                            <tr key={booking.id} className="text-center">
                                <td className="border p-2">{booking.id}</td>
                                <td className="border p-2">{booking.userName || "Unknown User"}</td>
                                <td className="border p-2">{booking.tourName || "Unknown Tour"}</td>
                                <td className="border p-2">{booking.bookingDate || "N/A"}</td>
                                <td className="border p-2">{booking.status || "N/A"}</td>
                                <td className="border p-2 flex justify-center space-x-2">
                                    <button
                                        onClick={() => handleEditClick(booking)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded"
                                    >
                                        Modify
                                    </button>
                                    <button
                                        onClick={() => handleApproveBooking(booking.id)}
                                        className="bg-green-500 text-white px-3 py-1 rounded"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleCancelBooking(booking.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="border p-2 text-center">
                                No bookings found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {editBooking && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-lg font-semibold mb-4">Modify Booking</h3>
                        <label className="block mb-2">Booking Date:</label>
                        <input
                            type="date"
                            value={editBooking.bookingDate}
                            onChange={(e) =>
                                setEditBooking({ ...editBooking, bookingDate: e.target.value })
                            }
                            className="border p-2 rounded w-full mb-4"
                        />
                        <label className="block mb-2">Select Tour:</label>
                        <select
                            value={editBooking.tourId || ""}
                            onChange={(e) =>
                                setEditBooking({
                                    ...editBooking,
                                    tourId: parseInt(e.target.value),
                                })
                            }
                            className="border p-2 rounded w-full mb-4"
                        >
                            <option value="" disabled>Select a Tour</option>
                            {tours.map((tour) => (
                                <option key={tour.id} value={tour.id}>
                                    {tour.title}
                                </option>
                            ))}
                        </select>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={handleUpdateBooking}
                                className="bg-green-500 text-white px-4 py-2 rounded"
                            >
                                Save Changes
                            </button>
                            <button
                                onClick={() => setEditBooking(null)}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageBooking;
