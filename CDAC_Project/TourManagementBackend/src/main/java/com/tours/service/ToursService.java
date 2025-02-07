package com.tours.service;
import java.util.List;

import com.tours.DTO.*;
public interface ToursService {

	public List<ToursRespDTO> getAllActiveTours();
	
	public List<ToursRespDTO> getActiveToursByRegionIds(List<Long> regionIds);

	public ToursRespDTO getTourDetailsById(Long tourId);
	
}
