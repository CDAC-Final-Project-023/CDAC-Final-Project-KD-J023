//package com.tours.service;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//import org.modelmapper.ModelMapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.tours.DTO.ToursRespDTO;
//import com.tours.custom_exceptions.ResourceNotFoundException;
//import com.tours.dao.ToursDao;
//import com.tours.entity.TourStatus;
//import com.tours.entity.*;
//
//import jakarta.transaction.Transactional;
//
//@Service
//@Transactional
//public class ToursServiceImpl implements ToursService{
//	
//	@Autowired
//	private ToursDao toursDao;
//	
//	@Autowired
//	private ModelMapper modelMapper;
//	
//	
//
//	@Override
//	public List<ToursRespDTO> getAllActiveTours() {
//	    return toursDao.findByStatus(TourStatus.ACTIVE)
//	            .stream()
//	            .map(tour -> {
//	                ToursRespDTO dto = modelMapper.map(tour, ToursRespDTO.class);
//	                dto.setCity(tour.getCity());
//	                dto.setRegion(tour.getRegion());
//	                dto.setPhotoPath(tour.getPhotoPath() != null ? tour.getPhotoPath() : null); 
//	                return dto;
//	            })
//	            .collect(Collectors.toList());
//	}
//
//	@Override
//	public List<ToursRespDTO> getActiveToursByRegionIds(List<Long> regionIds) {
//	    return toursDao.findByRegionIdsAndStatus(regionIds, TourStatus.ACTIVE)
//	            .stream()
//	            .map(tour -> {
//	                ToursRespDTO dto = modelMapper.map(tour, ToursRespDTO.class);
//	                dto.setCity(tour.getCity());
//	                dto.setRegion(tour.getRegion());
//	                dto.setPhotoPath(tour.getPhotoPath() != null ? tour.getPhotoPath() : null); // Set photo URL
//	                return dto;
//	            })
//	            .collect(Collectors.toList());
//	}
//
//	@Override
//	public ToursRespDTO getTourDetailsById(Long tourId) {
//		Tour tourEntity = toursDao.findById(tourId)
//	            .orElseThrow(() -> new ResourceNotFoundException("Invalid Tour ID !!!"));
//
//	    ToursRespDTO dto = modelMapper.map(tourEntity, ToursRespDTO.class);
//
//	    // Manually set the photoPath if photo exists
//	    if (tourEntity.getPhotoPath() != null) {
//	        dto.setPhotoPath(tourEntity.getPhotoPath());
//	    } else {
//	        dto.setPhotoPath(null); // 
//	    }
//
//	    return dto;
//	}
//
//}

package com.tours.service;

import com.tours.DTO.TourRequestDTO;
import com.tours.DTO.TourResponseDTO;
import com.tours.custom_exceptions.ResourceNotFoundException;
import com.tours.dao.CityDao;

import com.tours.dao.RegionDao;
import com.tours.dao.ToursDao;
import com.tours.entity.City;
import com.tours.entity.Region;
import com.tours.entity.Tour;
import com.tours.entity.TourStatus;
import com.tours.util.FileUploadUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ToursServiceImpl implements ToursService {

	@Autowired
	private ToursDao toursDao;
	@Autowired
	private CityDao cityDao;
	@Autowired
	private RegionDao regionDao;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List getAllActiveTours() {
		return toursDao.findByStatus(TourStatus.ACTIVE).stream().map(this::mapToResponseDTO)
				.collect(Collectors.toList());
	}

	@Override
	public List getActiveToursByRegionIds(List<Long> regionIds) {
		return toursDao.findByRegionIdsAndStatus(regionIds, TourStatus.ACTIVE).stream().map(this::mapToResponseDTO)
				.collect(Collectors.toList());
	}

	@Override
	public TourResponseDTO getTourDetailsById(Long tourId) {
		Tour tour = toursDao.findById(tourId).orElseThrow(() -> new ResourceNotFoundException("Invalid Tour ID!"));
		return mapToResponseDTO(tour);
	}

	@Override
	public TourResponseDTO addTour(TourRequestDTO tourRequestDTO, MultipartFile file) throws IOException {
		Tour tour = modelMapper.map(tourRequestDTO, Tour.class);

		City city = cityDao.findById(tourRequestDTO.getCityId())
				.orElseThrow(() -> new ResourceNotFoundException("City not found"));
		Region region = regionDao.findById(tourRequestDTO.getRegionId())
				.orElseThrow(() -> new ResourceNotFoundException("Region not found"));

		tour.setCity(city);
		tour.setRegion(region);

		if (file != null && !file.isEmpty()) {
			String fileName = FileUploadUtil.saveFile(file);
			tour.setPhotoPath(fileName);
		}

		tour = toursDao.save(tour);
		return mapToResponseDTO(tour);
	}

	@Override
	public TourResponseDTO updateTour(Long id, TourRequestDTO tourRequestDTO, MultipartFile file) throws IOException {
		Tour tour = toursDao.findById(id).orElseThrow(() -> new ResourceNotFoundException("Tour not found"));

		tour.setTitle(tourRequestDTO.getTitle());
		tour.setDescription(tourRequestDTO.getDescription());
		tour.setPrice(tourRequestDTO.getPrice());
		tour.setStatus(TourStatus.valueOf(tourRequestDTO.getStatus().toUpperCase()));

		City city = cityDao.findById(tourRequestDTO.getCityId())
				.orElseThrow(() -> new ResourceNotFoundException("City not found"));
		Region region = regionDao.findById(tourRequestDTO.getRegionId())
				.orElseThrow(() -> new ResourceNotFoundException("Region not found"));

		tour.setCity(city);
		tour.setRegion(region);

		if (file != null && !file.isEmpty()) {
			String fileName = FileUploadUtil.saveFile(file);
			tour.setPhotoPath(fileName);
		}

		tour = toursDao.save(tour);
		return mapToResponseDTO(tour);
	}

	@Override
	public TourResponseDTO changeTourStatus(Long tourId, String status) {
		Tour tour = toursDao.findById(tourId).orElseThrow(() -> new ResourceNotFoundException("Tour not found"));

		tour.setStatus(TourStatus.valueOf(status.toUpperCase()));
		tour = toursDao.save(tour);
		return mapToResponseDTO(tour);
	}

	@Override
	public void deleteTour(Long id) {
		Tour tour = toursDao.findById(id).orElseThrow(() -> new ResourceNotFoundException("Tour not found"));
		toursDao.delete(tour);
	}

	private TourResponseDTO mapToResponseDTO(Tour tour) {
		TourResponseDTO dto = modelMapper.map(tour, TourResponseDTO.class);
		dto.setCity(tour.getCity().getCityName());
		dto.setRegion(tour.getRegion().getName());
		dto.setPhotoUrl(tour.getPhotoPath() != null ? "/uploads/" + tour.getPhotoPath() : null);
		return dto;
	}

	@Override
	public TourResponseDTO getTourById(Long id) {
		Tour tour = toursDao.findById(id).orElseThrow(() -> new ResourceNotFoundException("Tour not found"));
		return mapToResponseDTO(tour);
	}

	@Override
	public List<TourResponseDTO> getAllTours(String keyword) {
		List<Tour> tours = keyword == null || keyword.isEmpty() ? toursDao.findAll()
				: toursDao.findByTitleContainingIgnoreCase(keyword);

		return tours.stream().map(this::mapToResponseDTO).collect(Collectors.toList());
	}
}
