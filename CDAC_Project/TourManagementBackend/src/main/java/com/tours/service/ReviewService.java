package com.tours.service;

import java.util.List;

import com.tours.DTO.*;
import com.tours.entity.ApiResponse;
import com.tours.entity.Review;



public interface ReviewService {
    ApiResponse addReview(ReviewDTO reviewDTO);
    List<Review> getAllReviews();
    List<Review> getReviewsByTourId(Long tourId);
}
