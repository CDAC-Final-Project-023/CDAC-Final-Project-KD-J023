package com.tours.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tours.entity.Region;

public interface RegionDao extends JpaRepository<Region, Long> {

}
