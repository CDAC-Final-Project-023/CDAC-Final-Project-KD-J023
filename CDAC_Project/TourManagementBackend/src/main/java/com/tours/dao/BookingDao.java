package com.tours.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tours.entity.Booking;

public interface BookingDao extends JpaRepository<Booking, Long>{

}
