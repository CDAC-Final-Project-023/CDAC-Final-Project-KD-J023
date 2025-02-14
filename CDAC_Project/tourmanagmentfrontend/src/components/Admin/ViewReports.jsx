import "chart.js/auto";
import "./Analytics.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";

import {
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/admin/analytics");
      setAnalytics(response.data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  return (
    <div className="analytics-container">
      <h2 className="analytics-title">📊 Admin Analytics Dashboard</h2>

      {analytics ? (
        <div className="analytics-grid">
          {/* Total Revenue */}
          <div className="card">
            <h3>Total Revenue (₹)</h3>
            <p className="highlight-text">₹{analytics.totalRevenue?.toLocaleString() || "0"}</p>
            <ResponsiveContainer width="100%" height={200}>
              <Doughnut
                data={{
                  labels: ["Revenue"],
                  datasets: [
                    {
                      data: [analytics.totalRevenue || 0, 500000],
                      backgroundColor: ["#4CAF50", "#E0E0E0"],
                    },
                  ],
                }}
              />
            </ResponsiveContainer>
          </div>

          {/* Total Bookings */}
          <div className="card">
            <h3>Total Bookings</h3>
            <p className="highlight-text">{analytics.totalBookings}</p>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={[{ name: "Bookings", value: analytics.totalBookings }]}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#2196F3" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Total Reviews */}
          <div className="card">
            <h3>Total Reviews</h3>
            <p className="highlight-text">{analytics.totalReviews}</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={[{ name: "Reviews", value: analytics.totalReviews }]}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#FF9800" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Most Booked Tours */}
          <div className="card">
            <h3>Most Booked Tours</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={analytics.mostBookedTours.map(([tour, count]) => ({
                  name: tour,
                  value: count,
                }))}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#673AB7" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top Rated Tours */}
          <div className="card">
            <h3>Top Rated Tours</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={analytics.topRatedTours.map(([tour, rating]) => ({
                    name: tour,
                    value: rating,
                  }))}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#FF5722"
                  label
                >
                  {analytics.topRatedTours.map((_, index) => (
                    <Cell
                      key={index}
                      fill={["#FF5722", "#FFC107", "#8BC34A", "#03A9F4", "#9C27B0"][index % 5]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div className="loading-spinner">Loading analytics...</div>
      )}
    </div>
  );
};

export default Analytics;
