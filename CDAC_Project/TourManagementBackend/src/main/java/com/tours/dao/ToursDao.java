package com.tours.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tours.entity.Tour;
import com.tours.entity.*;
public interface ToursDao extends JpaRepository<Tour, Long> {

	@Query("SELECT t FROM Tour t WHERE t.category.id IN :categoryIds AND t.status = :status")
    List<Tour> findByCategoryIdsAndStatus(@Param("categoryIds") List<Long> categoryIds, @Param("status") TourStatus status);

    @Query("SELECT t FROM Tour t WHERE t.status = :status")
    List<Tour> findByStatus(@Param("status") TourStatus status);
	
}
