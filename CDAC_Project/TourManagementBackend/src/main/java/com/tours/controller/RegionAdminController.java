package com.tours.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tours.DTO.RegionRespDTO;
import com.tours.entity.Region;
import com.tours.service.RegionAdminService;

@RestController
@RequestMapping
@CrossOrigin(origins = "http://localhost:3000")
public class RegionAdminController {

	@Autowired
	private RegionAdminService regionService;

	public RegionAdminController() {
		System.out.println("in ctor " + getClass());

	}
	
	 @GetMapping("admin/regions")
	    public ResponseEntity<List<RegionRespDTO>> getAllRegion() {
	        List<RegionRespDTO> region = regionService.getAllRegions();
	        return ResponseEntity.ok(region);
	    }
	 @GetMapping("admin/regions/{id}")
		public Region getRegionById(@PathVariable Long id) {
			return regionService.getRegionById(id);
		}
}
