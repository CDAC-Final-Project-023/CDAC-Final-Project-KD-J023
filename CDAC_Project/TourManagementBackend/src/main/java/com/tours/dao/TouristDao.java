package com.tours.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tours.entity.Booking;
import com.tours.entity.Tourist;

public interface TouristDao extends JpaRepository<Tourist, Long>{
	List<Tourist> findByBooking(Booking booking);

}
