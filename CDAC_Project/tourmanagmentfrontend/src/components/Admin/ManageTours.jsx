import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageTours = () => {
  const [tours, setTours] = useState([]);
  const [newTour, setNewTour] = useState({
    title: "",
    description: "",
    price: "",
    status: "Active", // New tour is active by default
  });
  const [selectedImage, setSelectedImage] = useState(null); // To store selected image file
  const [editingTour, setEditingTour] = useState(null);
  const [error, setError] = useState("");

  // Fetch tours from the backend
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get("/api/tours"); // Replace with your backend endpoint
        setTours(response.data);
      } catch (err) {
        console.error("Error fetching tours:", err);
        setError("Failed to fetch tours.");
      }
    };

    fetchTours();
  }, []);

  // Handle add tour
  const handleAddTour = async () => {
    if (!newTour.title || !newTour.description || !newTour.price || !selectedImage) {
      setError("All fields are required, including the image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", newTour.title);
    formData.append("description", newTour.description);
    formData.append("price", newTour.price);
    formData.append("status", newTour.status);
    formData.append("image", selectedImage); // Append the image file

    try {
      const response = await axios.post("/api/tours", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // This is important for file uploads
        },
      });

      setTours([...tours, response.data]);
      setNewTour({ title: "", description: "", price: "", status: "Active" }); // Reset form
      setSelectedImage(null); // Reset image
      setError(""); // Clear error
    } catch (err) {
      console.error("Error adding tour:", err);
      setError("Failed to add tour.");
    }
  };

  // Handle update tour
  const handleUpdateTour = async () => {
    if (!editingTour.title || !editingTour.description || !editingTour.price) {
      setError("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", editingTour.title);
    formData.append("description", editingTour.description);
    formData.append("price", editingTour.price);
    formData.append("status", editingTour.status);
    if (selectedImage) {
      formData.append("image", selectedImage); // Append the image file if selected
    }

    try {
      const response = await axios.put(`/api/tours/${editingTour.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // This is important for file uploads
        },
      });

      setTours(
        tours.map((tour) => (tour.id === editingTour.id ? response.data : tour))
      );
      setEditingTour(null); // Clear editing state
      setSelectedImage(null); // Reset image
      setError(""); // Clear error
    } catch (err) {
      console.error("Error updating tour:", err);
      setError("Failed to update tour.");
    }
  };

  // Handle soft delete (change status to Inactive)
  const handleDeleteTour = async (id) => {
    try {
      const response = await axios.put(`/api/tours/${id}`, { status: "Inactive" }); // Change status to Inactive
      setTours(
        tours.map((tour) => (tour.id === id ? { ...tour, status: "Inactive" } : tour))
      );
    } catch (err) {
      console.error("Error deleting tour:", err);
      setError("Failed to delete tour.");
    }
  };

  return (
    <div>
      <h3>{editingTour ? "Edit Tour" : "Add New Tour"}</h3>
      {error && <div className="error-message">{error}</div>}

      {/* Add or Edit Tour Form */}
      <div>
        <input
          type="text"
          placeholder="Tour Title"
          value={editingTour ? editingTour.title : newTour.title}
          onChange={(e) =>
            editingTour
              ? setEditingTour({ ...editingTour, title: e.target.value })
              : setNewTour({ ...newTour, title: e.target.value })
          }
        />
        <textarea
          placeholder="Tour Description"
          value={editingTour ? editingTour.description : newTour.description}
          onChange={(e) =>
            editingTour
              ? setEditingTour({ ...editingTour, description: e.target.value })
              : setNewTour({ ...newTour, description: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          value={editingTour ? editingTour.price : newTour.price}
          onChange={(e) =>
            editingTour
              ? setEditingTour({ ...editingTour, price: e.target.value })
              : setNewTour({ ...newTour, price: e.target.value })
          }
        />
        <input
          type="file"
          onChange={(e) => setSelectedImage(e.target.files[0])} // Handle image selection
        />
        <button onClick={editingTour ? handleUpdateTour : handleAddTour}>
          {editingTour ? "Update Tour" : "Add Tour"}
        </button>
      </div>

      <h3>Existing Tours</h3>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tours.length > 0 ? (
            tours.map((tour) => (
              <tr key={tour.id}>
                <td>{tour.title}</td>
                <td>{tour.description}</td>
                <td>{tour.price}</td>
                <td>{tour.status}</td>
                <td>
                  <button
                    onClick={() => setEditingTour(tour)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTour(tour.id)}
                  >
                    {tour.status === "Inactive" ? "Restore" : "Delete"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No tours available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageTours;
