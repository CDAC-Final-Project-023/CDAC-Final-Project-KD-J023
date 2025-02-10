package com.tours.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tours.DTO.CityDTO;
import com.tours.dao.CityDao;
import com.tours.entity.City;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CityAdminServiceImpl implements CityAdminService {

	@Autowired
	private CityDao cityDAO;

	@Override
	public List<CityDTO> getCitiesByRegion(Long regionId) {
		List<City> cities = cityDAO.findByRegionId(regionId);
		return cities.stream().map(this::convertToDTO).collect(Collectors.toList());
	}
	@Override
	public List<CityDTO> getAllCities() {
		List<City> cities = cityDAO.findAll(); // Fetch all cities
		return cities.stream().map(this::convertToDTO).collect(Collectors.toList());
	}

	private CityDTO convertToDTO(City city) {
		return new CityDTO(city.getId(), city.getCityName(), city.getRegion().getId());
	}

}
