import React, { useEffect, useState } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, 
  PieChart, Pie, Cell, ResponsiveContainer 
} from "recharts";

const ViewReports = () => {
  const [totalCollections, setTotalCollections] = useState(0);
  const [collectionHistory, setCollectionHistory] = useState([]);
  const [ratings, setRatings] = useState([]);  // ✅ Fixed missing useState for ratings
  const [bookings, setBookings] = useState([]);

  useEffect(() => {                 
    fetch("/api/reports/collections") 
      .then((response) => response.json())
      .then((data) => {
        console.log("Collection Data:", data);  
        setTotalCollections(data.totalCollections || 0);
        setCollectionHistory(data.collectionHistory || []);
      })
      .catch((error) => console.error("Error fetching total collections:", error));

    fetch("/api/reports/ratings")
      .then((response) => response.json())
      .then((data) => {
        console.log("Ratings Data:", data); 
        setRatings(data.ratings || []);
      })
      .catch((error) => console.error("Error fetching ratings:", error));

    fetch("/api/reports/bookings")
      .then((response) => response.json())
      .then((data) => {
        console.log("Bookings Data:", data); 
        setBookings(data.bookings || []);
      })
      .catch((error) => console.error("Error fetching bookings:", error));
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  // ✅ Process booking data to count bookings by status
  const bookingStatusData = Object.values(
    bookings.reduce((acc, booking) => {
      acc[booking.status] = acc[booking.status] || { status: booking.status, count: 0 };
      acc[booking.status].count += 1;
      return acc;
    }, {})
  );

  return (
    <div className="view-reports" style={{ padding: "20px" }}>
      <h1>Admin View Reports</h1>

      {/* ✅ Total Collections */}
      <div className="report-section">
        <h2>Total Collections</h2>
        <div className="collection-card">
          <h3>₹{totalCollections.toLocaleString()}</h3>
        </div>
                
        {/* ✅ Bar Chart for Collection History */}
        {collectionHistory.length > 0 ? (
          <ResponsiveContainer width="90%" height={300}>
            <BarChart data={collectionHistory}>
              <XAxis dataKey="month" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p>No collection data available</p>
        )}
      </div>

      {/* ✅ Ratings Section */}
      <div className="report-section">
        <h2>Ratings</h2>
        {ratings.length > 0 ? (
          <>
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

            <ResponsiveContainer width="90%" height={300}>
              <PieChart>
                <Pie 
                  data={ratings} 
                  dataKey="averageRating" 
                  nameKey="tourName" 
                  cx="50%" 
                  cy="50%" 
                  outerRadius={100} 
                  fill="#8884d8" 
                  label
                >
                  {ratings.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </>
        ) : (
          <p>No ratings available</p>
        )}
      </div>

      {/* ✅ Bookings by Status - Pie Chart & Bar Chart */}
      <div className="report-section">
        <h2>Bookings by Status</h2>

        {bookingStatusData.length > 0 ? (
          <>
            {/* ✅ Pie Chart for Bookings by Status */}
            <ResponsiveContainer width="90%" height={300}>
              <PieChart>
                <Pie
                  data={bookingStatusData}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#82ca9d"
                  label
                >
                  {bookingStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            {/* ✅ Bar Chart for Bookings by Status */}
            <ResponsiveContainer width="90%" height={300}>
              <BarChart data={bookingStatusData}>
                <XAxis dataKey="status" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#FF8042" />
              </BarChart>
            </ResponsiveContainer>
          </>
        ) : (
          <p>No bookings available</p>
        )}
      </div>
    </div>
  );
};

export default ViewReports;
