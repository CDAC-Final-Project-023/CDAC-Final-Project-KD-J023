import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddReview.css";

const AddReview = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState({ rating: "", comment: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/reviews/add", {
      ...review,
      userId: 1, // Replace with logged-in user ID
      tourId: bookingId
    })
    .then(() => {
      alert("Review submitted successfully!");
      navigate("/my-bookings");
    })
    .catch((error) => console.error("Error submitting review:", error));
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Add Review</h2>
      <form onSubmit={handleSubmit} className="review-form">
        <div className="mb-3">
          <label className="form-label">Rating (1-5)</label>
          <input
            type="number"
            className="form-control"
            min="1"
            max="5"
            value={review.rating}
            onChange={(e) => setReview({ ...review, rating: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Comment</label>
          <textarea
            className="form-control"
            rows="4"
            value={review.comment}
            onChange={(e) => setReview({ ...review, comment: e.target.value })}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-success">Submit Review</button>
      </form>
    </div>
  );
};

export default AddReview;
