package com.tours.service;

import java.util.List;

import com.tours.DTO.CityDTO;

public interface CityService {
	
	 List<CityDTO> getCitiesByRegion(Long regionId); 
	 List<CityDTO> getAllCities();
	}

