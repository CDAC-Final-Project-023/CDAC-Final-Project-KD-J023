import "./TourDetails.css";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/BetaNav";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function TourDetails() {
  const { id } = useParams(); // Get tour ID from URL
  const [tour, setTour] = useState(null);
  const [reviews, setReviews] = useState([]); // State for reviews
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        // Mock Data (Replace with API call when backend is ready)
        const mockData = {
          1: {
            id: 1,
            title: "Himalayan Adventure",
            description: "Explore the breathtaking Himalayas with this exciting trek. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            image: "https://www.esikkimtourism.in/wp-content/uploads/2019/05/adventure-tourism-sikkim-tts.jpg",    
            price: "$500 per person",
            itinerary: [
              "Day 1: Arrival in Manali",
              "Day 2: Trekking to Solang Valley",
              "Day 3: Camping under the stars",
              "Day 4: Return to Base"
            ]
          }
        };

        setTour(mockData[id]);

        /*
           UNCOMMENT & USE THIS CODE WHEN BACKEND IS READY:

          const response = await fetch(`http://localhost:8080/api/tours/${id}`);
          if (!response.ok) throw new Error("Failed to fetch tour details");
          const data = await response.json();
          setTour(data);
        */
      } catch (err) {
        setError("Failed to load tour details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        // Mock Data (Replace with API call when backend is ready)
        const mockReviews = [
          { id: 1, username: "John Doe", rating: 5, comment: "Amazing experience! Loved the trek." },
          { id: 2, username: "Sarah Lee", rating: 4, comment: "Great trip, but the weather was a bit rough." }
        ];

        setReviews(mockReviews);

        /*
          UNCOMMENT & USE THIS CODE WHEN BACKEND IS READY:

          const response = await fetch(`http://localhost:8080/api/reviews/${id}`);
          if (!response.ok) throw new Error("Failed to fetch reviews");
          const data = await response.json();
          setReviews(data);
        */
      } catch (err) {
        console.error("Failed to load reviews:", err);
      }
    };

    fetchTourDetails();
    fetchReviews();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!tour) return <div className="error-message">Tour not found.</div>;

  return (
    <div className="tour-details-container">
      <Navbar />
      <div className="tour-details-content">
        <h1>{tour.title}</h1>
        <img src={tour.image} alt={tour.title} className="tour-image" />
        <p className="tour-description">{tour.description}</p>

        <h3>Description</h3>
        <ul className="itinerary-list">
          {tour.itinerary.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <p className="tour-price">
          <strong>Price:</strong> {tour.price}
        </p>
        <Link to={`/purchase-package/${tour.id}`}>
          <button className="book-now-btn">Book Now</button>
        </Link>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <h2>Reviews</h2>
        {reviews.length > 0 ? (
          <ul className="reviews-list">
            {reviews.map((review) => (
              <li key={review.id} className="review-card">
                <h4>{review.username}</h4>
                <p className="rating">⭐ {review.rating}/5</p>
                <p className="comment">"{review.comment}"</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet. Be the first to review!</p>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default TourDetails;
