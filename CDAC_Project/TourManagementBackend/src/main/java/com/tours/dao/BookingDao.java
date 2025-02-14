package com.tours.dao;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.tours.entity.Booking;
import com.tours.entity.BookingStatus;

public interface BookingDao extends JpaRepository<Booking, Long> {
	List<Booking> findByStatus(BookingStatus status);

	@Query("SELECT SUM(t.price) FROM Booking b JOIN b.tour t WHERE b.status = 'APPROVED'")
	BigDecimal getTotalRevenue();

	// Get Most Booked Tours
	@Query("SELECT t.title, COUNT(b.id) FROM Booking b JOIN b.tour t GROUP BY t.title ORDER BY COUNT(b.id) DESC")
	List<Object[]> findMostBookedTours();
}
