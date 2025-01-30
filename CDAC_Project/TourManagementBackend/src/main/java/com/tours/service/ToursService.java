package com.tours.service;
import java.util.List;

import com.tours.DTO.*;
public interface ToursService {

	public List<ToursRespDTO> getAllActiveTours();
	
	public List<ToursRespDTO> getActiveToursByCategoryIds(List<Long> categoryIds);

	public ToursRespDTO getTourDetailsById(Long tourId);
	
}
