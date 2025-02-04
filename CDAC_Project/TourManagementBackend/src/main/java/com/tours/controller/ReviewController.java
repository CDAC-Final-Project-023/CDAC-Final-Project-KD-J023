package com.tours.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tours.dto.ReviewDTO;
import com.tours.entity.Review;
import com.tours.service.ReviewService;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/reviews")
public class ReviewController {
    
    @Autowired
    private ReviewService reviewService;

    // Any user should be able to view all reviews
    @GetMapping("/view")
    public ResponseEntity<List<?>> viewReviews() {
        return ResponseEntity.ok(reviewService.getAllReviews());
    }

   
    // Add a review (only authenticated users should be able to add a review)
    @PostMapping("/add")
    public ResponseEntity<?> addReview(@RequestBody @Valid ReviewDTO reviewDTO) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(reviewService.addReview(reviewDTO));
    }

    @GetMapping("/tour/{tourId}")
    public ResponseEntity<List<Review>> getReviewsByTourId(@PathVariable Long tourId) {
        return ResponseEntity.ok(reviewService.getReviewsByTourId(tourId));
    }
}
