package com.tours.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
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
import com.tours.custom_exceptions.ResourceNotFoundException;
import com.tours.dao.ToursDao;
import com.tours.entity.Tour;
import com.tours.entity.TourStatus;

@RestController
@RequestMapping
@CrossOrigin(origins = "http://localhost:3000")
public class ToursUserController {

	@Autowired 
	private ToursService tourService ;
	@Autowired
	private  ToursDao tourDAO;
	@Autowired
    private ModelMapper modelMapper;
	
	@GetMapping("/region")
    public ResponseEntity<List<ToursRespDTO>> getToursByRegions(
            @RequestParam(value = "regionIds", required = false) List<Long> regionIds) {
        List<ToursRespDTO> tours;
        if (regionIds == null || regionIds.isEmpty()) {
           
            tours = tourService.getAllActiveTours();
        } else {
            
            tours = tourService.getActiveToursByRegionIds(regionIds);
        }
        return ResponseEntity.ok(tours);
    }



//	@GetMapping("/{tourId}")
//	public ResponseEntity<?> getTourById(@PathVariable Long tourId){
//		System.out.println("in getTourDetailsById" + tourId);
//		ToursRespDTO tour=tourService.getTourDetailsById(tourId);
//		return ResponseEntity.ok(tour);
//		
//	}
	 @GetMapping("/tours/region/{tourId}")
	    public ResponseEntity<?> getTourById(@PathVariable Long tourId) {
	        System.out.println("in getTourDetailsById " + tourId);

	        Tour tour = tourDAO.findById(tourId)
	                .orElseThrow(() -> new ResourceNotFoundException("Tour not found with ID: " + tourId));

	        ToursRespDTO tourRespDTO = modelMapper.map(tour, ToursRespDTO.class);

	        return ResponseEntity.ok(tourRespDTO);
	    }
	
	
}
