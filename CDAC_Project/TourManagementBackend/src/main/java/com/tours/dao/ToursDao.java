package com.tours.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tours.entity.Tour;
import com.tours.entity.*;


@Repository
public interface ToursDao extends JpaRepository<Tour, Long> {

	@Query("SELECT t FROM Tour t WHERE t.region.id IN :regionIds AND t.status = :status")
    List<Tour> findByRegionIdsAndStatus(@Param("regionIds") List<Long> regionIds, @Param("status") TourStatus status);

    @Query("SELECT t FROM Tour t WHERE t.status = :status")
    List<Tour> findByStatus(@Param("status") TourStatus status);

	List<Tour> findByTitleContainingIgnoreCase(String keyword);

    
	
}
