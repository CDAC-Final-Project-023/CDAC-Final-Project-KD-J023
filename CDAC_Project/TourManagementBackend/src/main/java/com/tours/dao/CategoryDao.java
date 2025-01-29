package com.tours.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tours.entity.Category;

public interface CategoryDao extends JpaRepository<Category, Long> {

}
