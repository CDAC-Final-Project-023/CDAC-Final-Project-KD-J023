package com.tours.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.tours.entity.Review;

public interface ReviewDao extends JpaRepository<Review, Long> {
	List<Review> findByTourId(Long tourId);

	@Query("SELECT COUNT(r.id) FROM Review r")
	long getTotalReviews();

	// Get top-rated tours (average rating of each tour)
	@Query("SELECT t.title, AVG(r.rating) FROM Review r JOIN r.tour t GROUP BY t.title ORDER BY AVG(r.rating) DESC")
	List<Object[]> findTopRatedTours();
}
