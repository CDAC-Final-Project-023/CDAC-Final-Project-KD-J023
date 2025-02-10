package com.tours.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tours.DTO.RegionRespDTO;
import com.tours.service.RegionService;

@RestController
@RequestMapping("/region")
@CrossOrigin(origins = "http://localhost:3000")
public class RegionController {

	@Autowired
	private RegionService regionService;

	public RegionController() {
		System.out.println("in ctor " + getClass());

	}
	 @GetMapping()
	    public ResponseEntity<List<RegionRespDTO>> getAllRegion() {
	        List<RegionRespDTO> region = regionService.getAllRegions();
	        return ResponseEntity.ok(region);
	    }
	
}
