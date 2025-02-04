package com.tours.service;


import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tours.dao.ReviewDao;
import com.tours.dto.ApiResponse;
import com.tours.dto.ReviewDTO;
import com.tours.entity.Review;


@Service
@Transactional
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewDao reviewDao;

    @Autowired
    private ModelMapper mapper;

    @Override
    public ApiResponse addReview(ReviewDTO reviewDTO) {
        Review review = mapper.map(reviewDTO, Review.class);
        reviewDao.save(review);
        return new ApiResponse("Added new review with ID " + review.getId());
    }

    @Override
    public List<Review> getAllReviews() {
        return reviewDao.findAll();
    }

    @Override
    public List<Review> getReviewsByTourId(Long tourId) {  // New method
        return reviewDao.findByTourId(tourId);
    }
   
    
}
