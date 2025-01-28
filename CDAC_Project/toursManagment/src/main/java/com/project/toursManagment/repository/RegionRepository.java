package com.project.toursManagment.repository;


import com.project.toursManagment.entity.Region;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegionRepository extends JpaRepository<Region, Long> {
 
    Region findByRegionName(String regionName);
}
