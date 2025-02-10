import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { config } from "../services/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./StarRating.css"; // Custom CSS for star rating

const StarRating = ({ tourId, userId }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleStarClick = (index) => {
    setRating(index + 1);
    setShowReviewForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${config.serverUrl}/reviews/add`, {
        rating,
        comment: reviewText,
        tourId,
        userId,
      });
      if (response.status === 201) {
        setIsSubmitted(true);
        toast.success("Review submitted successfully!");
      }
    } catch (error) {
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer />
    <div className="star-rating container">
      {isSubmitted ? (
        <p>Review submitted</p>
      ) : (
        <>
          <div className="stars row justify-content-center">
            {[...Array(5)].map((star, index) => (
              <span
                key={index}
                className={`col-auto ${
                  index < rating ? "star filled" : "star"
                }`}
                onClick={() => handleStarClick(index)}>
                &#9733;
              </span>
            ))}
          </div>
          <form
            onSubmit={handleSubmit}
            className={`row ${showReviewForm ? "show" : ""}`}>
            <div className="col-12">
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your review here..."
                className="form-control mt-2"
                disabled={isLoading}
              />
            </div>
            <div className="col-12">
              <button
                type="submit"
                className="btn btn-primary mt-2"
                disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
    </div>
  );
};

StarRating.propTypes = {
  tourId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
};

export default StarRating;
