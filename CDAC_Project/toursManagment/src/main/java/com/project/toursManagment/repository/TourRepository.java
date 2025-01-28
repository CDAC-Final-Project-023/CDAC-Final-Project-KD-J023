package com.project.toursManagment.repository;

import com.project.toursManagment.entity.Tour;
import com.project.toursManagment.entity.TourStatus;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TourRepository extends JpaRepository<Tour, Long> {
	 List<Tour> findByStatus(TourStatus status);
}
