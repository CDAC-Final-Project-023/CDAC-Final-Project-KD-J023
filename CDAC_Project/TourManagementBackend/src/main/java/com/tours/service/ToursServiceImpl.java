package com.tours.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tours.DTO.ToursRespDTO;
import com.tours.custom_exceptions.ResourceNotFoundException;
import com.tours.dao.ToursDao;
import com.tours.entity.TourStatus;
import com.tours.entity.*;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ToursServiceImpl implements ToursService{
	
	@Autowired
	private ToursDao toursDao;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<ToursRespDTO> getAllActiveTours() {
	    return toursDao.findByStatus(TourStatus.ACTIVE)
	            .stream()
	            .map(tour -> {
	                ToursRespDTO dto = modelMapper.map(tour, ToursRespDTO.class);
	                dto.setCityName(tour.getCity().getCityName());
	                dto.setStateName(tour.getState().getStateName());
	                dto.setCategoryName(tour.getCategory().getName());
	                dto.setPhotoPath(tour.getPhoto() != null ? tour.getPhoto().getPhotoPath() : null); // Set photo URL
	                return dto;
	            })
	            .collect(Collectors.toList());
	}

	@Override
	public List<ToursRespDTO> getActiveToursByCategoryIds(List<Long> categoryIds) {
	    return toursDao.findByCategoryIdsAndStatus(categoryIds, TourStatus.ACTIVE)
	            .stream()
	            .map(tour -> {
	                ToursRespDTO dto = modelMapper.map(tour, ToursRespDTO.class);
	                dto.setCityName(tour.getCity().getCityName());
	                dto.setStateName(tour.getState().getStateName());
	                dto.setCategoryName(tour.getCategory().getName());
	                dto.setPhotoPath(tour.getPhoto() != null ? tour.getPhoto().getPhotoPath() : null); // Set photo URL
	                return dto;
	            })
	            .collect(Collectors.toList());
	}

	@Override
	public ToursRespDTO getTourDetailsById(Long tourId) {
		Tour tourEntity =toursDao.findById(tourId).orElseThrow(() -> new ResourceNotFoundException("Invalid Tour ID !!!"));
		return modelMapper.map(tourEntity, ToursRespDTO.class);
	}





	
	


}
