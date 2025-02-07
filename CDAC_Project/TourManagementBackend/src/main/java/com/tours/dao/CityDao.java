package com.tours.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tours.entity.City;

public interface CityDao extends JpaRepository<City, Long> {

}
