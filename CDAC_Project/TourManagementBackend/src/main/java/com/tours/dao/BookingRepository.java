package com.tours.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tours.entity.Booking;
public interface BookingRepository extends JpaRepository<Booking, Long> {
    
}