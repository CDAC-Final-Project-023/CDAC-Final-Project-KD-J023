package com.tours.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tours.entity.Tours;




public interface TourRepo extends JpaRepository<Tours, Long> {

}
