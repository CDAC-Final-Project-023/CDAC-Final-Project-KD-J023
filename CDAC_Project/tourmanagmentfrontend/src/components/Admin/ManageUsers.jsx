import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  // Fetch users data from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users"); // Replace with your backend endpoint
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users.");
      }
    };

    fetchUsers();
  }, []);

  // Handle block/unblock user
  const handleBlockUnblockUser = async (id, status) => {
    try {
      const newStatus = status === "Blocked" ? "Active" : "Blocked"; // Toggle between Blocked and Active status
      const response = await axios.put(`/api/users/${id}`, { status: newStatus });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, status: newStatus } : user
        )
      );
    } catch (err) {
      console.error("Error updating user status:", err);
      setError("Failed to update user status.");
    }
  };

  return (
    <div>
      <h3>Manage Users</h3>
      {error && <div className="error-message">{error}</div>}
      
      <h4>Existing Users</h4>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.status}</td>
                <td>
                  <button
                    className="block-unblock-btn"
                    onClick={() => handleBlockUnblockUser(user.id, user.status)}
                  >
                    {user.status === "Blocked" ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
