package com.tours.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.tours.DTO.*;
import com.tours.entity.TourStatus;

public interface ToursAdminService {

	public List<ToursRespDTO> getAllActiveTours();

	public List<ToursRespDTO> getActiveToursByRegionIds(List<Long> regionIds);

	TourResponseDTO getTourDetailsById(Long tourId);

	TourResponseDTO addTour(TourRequestDTO tourRequestDTO, MultipartFile file) throws IOException;

	TourResponseDTO updateTour(Long id, TourRequestDTO tourRequestDTO, MultipartFile file) throws IOException;

	TourResponseDTO getTourById(Long id);

	List<TourResponseDTO> getAllTours(String keyword);

	TourResponseDTO changeTourStatus(Long tourId, String status);

	void deleteTour(Long id);

	
}
