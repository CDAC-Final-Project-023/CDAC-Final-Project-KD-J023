package com.tours.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tours.DTO.*;
import com.tours.entity.Review;
import com.tours.service.ReviewService;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {
    
    @Autowired
    private ReviewService reviewService;

    // Any user should be able to view all reviews
    @GetMapping("/view")
    public ResponseEntity<List<?>> viewReviews() {
        return ResponseEntity.ok(reviewService.getAllReviews());
    }

   
    @PostMapping("/add")
    public ResponseEntity<?> addReview(@RequestBody @Valid ReviewDTO reviewDTO) {
    	System.out.println(reviewDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(reviewService.addReview(reviewDTO));
    }

    @GetMapping("/tour/{tourId}")
    public ResponseEntity<List<Review>> getReviewsByTourId(@PathVariable Long tourId) {
    	System.out.println("in class " +getClass() );
        return ResponseEntity.ok(reviewService.getReviewsByTourId(tourId));
    }
}
