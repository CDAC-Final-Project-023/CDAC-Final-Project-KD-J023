package com.tours.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tours.entity.Tour;

public interface TourDao extends JpaRepository<Tour, Long> {

}
