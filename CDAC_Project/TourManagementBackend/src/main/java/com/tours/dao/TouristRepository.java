package com.tours.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tours.entity.Tourist;


public interface TouristRepository extends JpaRepository<Tourist, Long>{

}
