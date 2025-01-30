package com.tours.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tours.service.ToursService;
import com.tours.DTO.*;

@RestController
@RequestMapping("/tours")
@CrossOrigin(origins = "http://localhost:3000")
public class ToursController {

	@Autowired 
	private ToursService tourService ;
	
	public ToursController() {
		System.out.println("in ctor " + getClass());
	}
	

	

	@GetMapping("/categories")
    public ResponseEntity<List<ToursRespDTO>> getToursByCategories(
            @RequestParam(value = "categoryIds", required = false) List<Long> categoryIds) {
        List<ToursRespDTO> tours;
        if (categoryIds == null || categoryIds.isEmpty()) {
            // Fetch all active tours if no category IDs are provided
            tours = tourService.getAllActiveTours();
        } else {
            // Fetch tours for the specified category IDs
            tours = tourService.getActiveToursByCategoryIds(categoryIds);
        }
        return ResponseEntity.ok(tours);
    }
	

	@GetMapping("/{tourId}")
	public ResponseEntity<?> getTourById(@PathVariable Long tourId){
		System.out.println("in getTourDetailsById" + tourId);
		ToursRespDTO tour=tourService.getTourDetailsById(tourId);
		return ResponseEntity.ok(tour);
		
	}
	
	
}
