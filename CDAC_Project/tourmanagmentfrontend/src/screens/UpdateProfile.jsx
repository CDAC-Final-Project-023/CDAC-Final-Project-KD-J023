import "./UpdateProfile.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import  Navbar  from "../components/navbar/BetaNav";
const UserProfile = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch logged-in user details from the backend
  useEffect(() => {
    axios
      .get("http://localhost:8080/auth/user/${userId}", {
        withCredentials: true,
      }) // Adjust endpoint as needed
      .then((response) => {
        setUser({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          mobile: response.data.mobile || "",
          newPassword: "",
          confirmPassword: "",
        });
      })
      .catch((err) => setError("Failed to fetch user details"));
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      setError("Invalid email format");
      return;
    }

    // Validate passwords (only if entered)
    if (user.newPassword || user.confirmPassword) {
      if (user.newPassword !== user.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
    }

    // Send update request
    try {
      const response = await axios.put(
        "http://localhost:8080/auth/user/update/${userId}",
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          mobile: user.mobile || null, // Send null if mobile is empty
          newPassword: user.newPassword || null, // Update password only if provided
        },
        { withCredentials: true }
      );

      setMessage(response.data.message);
      setError("");
    } catch (err) {
      setError("Failed to update profile");
    }
  };

  return (
    
    <div className="container mx-auto max-w-lg mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">User Profile</h2>

      {message && <p className="text-green-600 text-center">{message}</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Mobile (Optional)</label>
          <input
            type="tel"
            name="mobile"
            value={user.mobile}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700">New Password (Optional)</label>
          <input
            type="password"
            name="newPassword"
            value={user.newPassword}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Save
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
