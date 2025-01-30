package com.tours.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tours.DTO.CategoryRespDTO;
import com.tours.dao.CategoryDao;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {
	

	@Autowired
	private CategoryDao categoryDao;
	@Autowired
	private ModelMapper modelMapper;
	
	 @Override
	    public List<CategoryRespDTO> getAllCategories() {
	        return categoryDao.findAll() // List<Category>
	                .stream() // Stream<Category>
	                .map(category -> modelMapper.map(category, CategoryRespDTO.class)) // Stream<CategoryRespDTO>
	                .collect(Collectors.toList()); // List<CategoryRespDTO>
	    }

	
}
