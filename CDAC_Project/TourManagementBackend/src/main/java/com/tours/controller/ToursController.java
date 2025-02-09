

package com.tours.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.tours.DTO.TourRequestDTO;
import com.tours.DTO.TourResponseDTO;
import com.tours.service.ToursService;

@RestController
@RequestMapping("/admin/tours")
@CrossOrigin(origins = "http://localhost:3000")
public class ToursController {

 

    @Autowired
    private ToursService tourService;
    
    @GetMapping
    public List<TourResponseDTO> getAllTours(@RequestParam(required = false) String keyword) {
        return tourService.getAllTours(keyword);
    }

    @PostMapping("/add")
    public TourResponseDTO addTour(@ModelAttribute TourRequestDTO tourRequestDTO, 
                                   @RequestParam("file") MultipartFile file) throws IOException {
        return tourService.addTour(tourRequestDTO, file);
    }


    @PutMapping("/update/{id}")
    public TourResponseDTO updateTour(@PathVariable Long id, 
                                      @ModelAttribute TourRequestDTO tourRequestDTO,
                                      @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
        return tourService.updateTour(id, tourRequestDTO, file);
    }

    @GetMapping("/{id}")
    public TourResponseDTO getTourById(@PathVariable Long id) {
        return tourService.getTourById(id);
    }

    @PatchMapping("/status/{id}")
    public TourResponseDTO changeTourStatus(@PathVariable Long id, @RequestParam("status") String status) {
        return tourService.changeTourStatus(id, status);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteTour(@PathVariable Long id) {
        tourService.deleteTour(id);
    }
    
}

