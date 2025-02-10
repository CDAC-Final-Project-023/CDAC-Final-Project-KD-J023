package com.tours.service;


import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tours.dao.ReviewDao;
import com.tours.dao.ToursDao;
import com.tours.dao.UserDao;
import com.tours.DTO.*;
import com.tours.custom_exceptions.ResourceNotFoundException;
import com.tours.entity.Review;
import com.tours.entity.Tour;
import com.tours.entity.User;


@Service
@Transactional
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewDao reviewDao;
    @Autowired
    private UserDao userDao;
    
    @Autowired
    private ToursDao toursDao;

    @Autowired
    private ModelMapper mapper;

    @Override
    public ApiResponse addReview(ReviewDTO reviewDTO) {
        Review review = mapper.map(reviewDTO, Review.class);

        User user = userDao.findById(reviewDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + reviewDTO.getUserId()));

        Tour tour = toursDao.findById(reviewDTO.getTourId())
                .orElseThrow(() -> new ResourceNotFoundException("Tour not found with ID: " + reviewDTO.getTourId()));

        review.setUser(user);
        review.setTour(tour);

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
