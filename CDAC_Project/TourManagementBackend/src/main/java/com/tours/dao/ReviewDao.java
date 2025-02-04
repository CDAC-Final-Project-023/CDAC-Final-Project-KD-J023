package com.tours.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tours.entity.Review;

public interface ReviewDao extends JpaRepository<Review, Long> {
	List<Review> findByTourId(Long tourId);
}
