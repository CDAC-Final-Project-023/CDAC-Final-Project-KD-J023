package com.tours.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tours.DTO.CategoryRespDTO;
import com.tours.service.CategoryService;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryController {

	@Autowired
	private CategoryService categoryService;

	public CategoryController() {
		System.out.println("in ctor " + getClass());

	}
	
	 @GetMapping()
	    public ResponseEntity<List<CategoryRespDTO>> getAllCategories() {
	        List<CategoryRespDTO> categories = categoryService.getAllCategories();
	        return ResponseEntity.ok(categories);
	    }
	
}
