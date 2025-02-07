import axios from "axios";
import { useEffect, useState } from "react";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/admin/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      const newStatus = currentStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE";
      await axios.put(`http://localhost:8080/admin/users/${userId}/status`, { status: newStatus });
      setMessage(`User status updated to ${newStatus}`);
      fetchUsers();
    } catch (error) {
      setMessage("Failed to update status");
    }
  };

  const softDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/admin/users/${userId}`);
      setMessage("User deleted successfully");
      fetchUsers();
    } catch (error) {
      setMessage("Failed to delete user");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Manage Users</h2>
      {message && <div className="alert alert-info">{message}</div>}
      {loading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.mobileNumber}</td>
                <td>
                  <span className={`badge ${user.role === "ADMIN" ? "bg-danger" : "bg-primary"}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className={`badge ${user.status === "ACTIVE" ? "bg-success" : "bg-warning"}`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => toggleUserStatus(user.id, user.status)}>
                    {user.status === "ACTIVE" ? "Block" : "Unblock"}
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => softDeleteUser(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageUser;
