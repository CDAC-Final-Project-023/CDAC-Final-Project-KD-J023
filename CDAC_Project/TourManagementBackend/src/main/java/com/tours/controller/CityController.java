package com.tours.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tours.DTO.CityDTO;
import com.tours.service.CityService;

import java.util.List;

@RestController
@RequestMapping("/cities/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class CityController {

	@Autowired
	private CityService cityService;

	@GetMapping("/by-region/{regionId}")
	public ResponseEntity<List<CityDTO>> getCitiesByRegion(@PathVariable Long regionId) {
		try {
			List<CityDTO> cities = cityService.getCitiesByRegion(regionId);
			return ResponseEntity.ok(cities);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
}

