package com.tours.DTO;

public class TourRatingDTO {
    private Long tourId;
    private String tourName;
    private Double averageRating;
    private Long totalReviews;

    // Default constructor
    public TourRatingDTO() {}

    // Parameterized constructor
    public TourRatingDTO(Long tourId, String tourName, Double averageRating, Long totalReviews) {
        this.tourId = tourId;
        this.tourName = tourName;
        this.averageRating = averageRating;
        this.totalReviews = totalReviews;
    }

    // Getters and setters
    public Long getTourId() { return tourId; }
    public void setTourId(Long tourId) { this.tourId = tourId; }
    public String getTourName() { return tourName; }
    public void setTourName(String tourName) { this.tourName = tourName; }
    public Double getAverageRating() { return averageRating; }
    public void setAverageRating(Double averageRating) { this.averageRating = averageRating; }
    public Long getTotalReviews() { return totalReviews; }
    public void setTotalReviews(Long totalReviews) { this.totalReviews = totalReviews; }
}
