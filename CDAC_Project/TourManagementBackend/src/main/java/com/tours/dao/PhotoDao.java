package com.tours.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tours.entity.Photo;

public interface PhotoDao  extends JpaRepository<Photo, Long>{

}
