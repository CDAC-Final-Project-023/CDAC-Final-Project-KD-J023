package com.tours.service;

import java.util.List;

import com.tours.dto.ApiResponse;
import com.tours.dto.ReviewDTO;
import com.tours.entity.Review;


public interface ReviewService {
    ApiResponse addReview(ReviewDTO reviewDTO);
    List<Review> getAllReviews();
    List<Review> getReviewsByTourId(Long tourId);
}
