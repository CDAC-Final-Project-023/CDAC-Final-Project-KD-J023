package com.tours.service;

import java.util.List;

import com.tours.DTO.RegionRespDTO;
import com.tours.entity.Region;

public interface RegionService {

	public List<RegionRespDTO> getAllRegions();
	public Region getRegionById(Long id);
	
}
