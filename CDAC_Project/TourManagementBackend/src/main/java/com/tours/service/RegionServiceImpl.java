package com.tours.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tours.DTO.RegionRespDTO;
import com.tours.dao.RegionDao;
import com.tours.entity.Region;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class RegionServiceImpl implements RegionService {
	

	@Autowired
	private RegionDao regionDao;
	@Autowired
	private ModelMapper modelMapper;
	
	 @Override
	    public List<RegionRespDTO> getAllRegions() {
	        return regionDao.findAll() 
	                .stream() 
	                .map(region -> modelMapper.map(region, RegionRespDTO.class)) 
	                .collect(Collectors.toList()); 
	    }
	 
	 public Region getRegionById(Long id) {
	        return regionDao.findById(id)
	                .orElseThrow();
	    }

	
}
