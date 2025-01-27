import "./AdminDashboard.css";
import ManageBookings from "../../components/Admin/ManageBookings";
import ManageTours from "../../components/Admin/ManageTours";
import ManageUsers from "../../components/Admin/ManageUsers";
import React, { useState } from "react";
import ViewReports from "../../components/Admin/ViewReports";

// /src/screens/AdminDashboardPage/AdminDashboard.jsx

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("manageTours");
  const [tours, setTours] = useState([
    { id: 1, name: "Golden Triangle Tour", description: "Explore Delhi, Agra, and Jaipur.", imageUrl: "https://via.placeholder.com/100" },
    { id: 2, name: "Goa Beach Tour", description: "Relax on the beautiful beaches of Goa.", imageUrl: "https://via.placeholder.com/100" },
  ]);
  const [editingTour, setEditingTour] = useState(null);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="tabs">
        <button
          className={activeTab === "manageTours" ? "active" : ""}
          onClick={() => setActiveTab("manageTours")}
        >
          Manage Tours
        </button>
        <button
          className={activeTab === "manageUsers" ? "active" : ""}
          onClick={() => setActiveTab("manageUsers")}
        >
          Manage Users
        </button>
        <button
          className={activeTab === "manageBookings" ? "active" : ""}
          onClick={() => setActiveTab("manageBookings")}
        >
          Manage Bookings
        </button>
        <button
          className={activeTab === "viewReports" ? "active" : ""}
          onClick={() => setActiveTab("viewReports")}
        >
          View Reports
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "manageTours" && (
          <ManageTours
            tours={tours}
            setTours={setTours}
            setEditingTour={setEditingTour}
          />
        )}
        {activeTab === "manageUsers" && <ManageUsers />}
        {activeTab === "manageBookings" && <ManageBookings />}
        {activeTab === "viewReports" && <ViewReports />}
      </div>
    </div>
  );
};

export default AdminDashboard;
