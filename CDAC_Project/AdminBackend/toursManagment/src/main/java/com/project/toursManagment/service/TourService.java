package com.project.toursManagment.service;

import com.project.toursManagment.entity.Tour;
import com.project.toursManagment.repository.TourRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TourService {

    @Autowired
    private TourRepository tourRepository;

    // Get all tours
    public List<Tour> getAllTours() {
        return tourRepository.findAll();
    }

    // Get tour by id
    public Tour getTourById(Long id) {
        return tourRepository.findById(id).orElse(null);
    }

    // Create a new tour
    public Tour createTour(Tour tour) {
        return tourRepository.save(tour);
    }

    // Update tour
    public Tour updateTour(Long id, Tour tourDetails) {
        Tour existingTour = tourRepository.findById(id).orElseThrow(() -> new RuntimeException("Tour not found"));
        
        // Update the properties of the existing tour
        existingTour.setName(tourDetails.getName());
        existingTour.setDescription(tourDetails.getDescription());
        existingTour.setPrice(tourDetails.getPrice());
        existingTour.setCategory(tourDetails.getCategory());
        existingTour.setRegion(tourDetails.getRegion());
        existingTour.setState(tourDetails.getState());
        existingTour.setStatus(tourDetails.getStatus());
        
        return tourRepository.save(existingTour);
    }

    // Delete tour
    public void deleteTour(Long id) {
        tourRepository.deleteById(id);
    }
}
