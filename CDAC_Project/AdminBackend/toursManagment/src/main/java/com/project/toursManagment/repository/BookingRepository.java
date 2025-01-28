package com.project.toursManagment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.toursManagment.entity.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
}

