
package com.tours.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.tours.DTO.TourRequestDTO;
import com.tours.DTO.TourResponseDTO;
import com.tours.service.ToursAdminService;

@RestController
@RequestMapping("/admin/tours")
@CrossOrigin(origins = "http://localhost:3000")
public class ToursAdminController {

	@Autowired
	private ToursAdminService tourService;

	@GetMapping
	public List<TourResponseDTO> getAllTours(@RequestParam(required = false) String keyword) {
		return tourService.getAllTours(keyword);
	}

	@PostMapping("/add")
	public TourResponseDTO addTour(@ModelAttribute TourRequestDTO tourRequestDTO,
			@RequestParam("file") MultipartFile file) throws IOException {
		return tourService.addTour(tourRequestDTO, file);
	}

	@PutMapping("/update/{id}")
	public TourResponseDTO updateTour(@PathVariable Long id, @ModelAttribute TourRequestDTO tourRequestDTO,
			@RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
		return tourService.updateTour(id, tourRequestDTO, file);
	}

	@GetMapping("/{id}")
	public TourResponseDTO getTourById(@PathVariable Long id) {
		return tourService.getTourById(id);
	}

	
	@PutMapping("/status/{id}")
	public ResponseEntity<TourResponseDTO> updateTourStatus(@PathVariable Long id, @RequestParam String status) {
	    TourResponseDTO updatedTour = tourService.changeTourStatus(id, status);
	    return ResponseEntity.ok(updatedTour);
	}


	@DeleteMapping("/delete/{id}")
	public void deleteTour(@PathVariable Long id) {
		tourService.deleteTour(id);
	}

}
