//package com.tours.controller;
//
//import java.io.IOException;
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.ModelAttribute;
//import org.springframework.web.bind.annotation.PatchMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.multipart.MultipartFile;
//
//import com.tours.service.ToursService;
//import com.tours.DTO.*;
//
//@RestController
//@RequestMapping
//@CrossOrigin(origins = "http://localhost:3000")
//public class ToursController {
//
//	@Autowired 
//	private ToursService tourService ;
//	
//	
//	@PostMapping("admin/tours/add")
//    public TourResponseDTO addTour(@ModelAttribute TourRequestDTO tourRequestDTO, 
//                                   @RequestParam("file") MultipartFile file) throws IOException {
//        return tourService.addTour(tourRequestDTO, file);
//    }
//	
//	@PutMapping("admin/tours/update/{id}")
//    public TourResponseDTO updateTour(@PathVariable Long id, 
//                                      @ModelAttribute TourRequestDTO tourRequestDTO,
//                                      @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
//        return tourService.updateTour(id, tourRequestDTO, file);
//    }
//
//	@GetMapping("/admin/tours")
//    public List<TourResponseDTO> getAllTours(@RequestParam(required = false) String keyword) {
//        return tourService.getAllTours(keyword);
//    }
//
//	
//	@GetMapping("admin/regions")
//    public ResponseEntity<List<ToursRespDTO>> getToursByRegions(
//            @RequestParam(value = "regionIds", required = false) List<Long> regionIds) {
//        List<ToursRespDTO> tours;
//        if (regionIds == null || regionIds.isEmpty()) {
//           
//            tours = tourService.getAllActiveTours();
//        } else {
//            
//            tours = tourService.getActiveToursByRegionIds(regionIds);
//        }
//        return ResponseEntity.ok(tours);
//    }
//	
//
//	@GetMapping("tours/{tourId}")
//	public ResponseEntity<?> getTourById(@PathVariable Long tourId){
//		TourResponseDTO tour=tourService.getTourDetailsById(tourId);
//		return ResponseEntity.ok(tour);
//		
//	}
//	
//	 
//    @PatchMapping("/admin/tours/status/{id}")
//    public TourResponseDTO changeTourStatus(@PathVariable Long id, @RequestParam("status") String status) {
//        return tourService.changeTourStatus(id, status);
//    }
//
//    @DeleteMapping("/admin/tours/delete/{id}")
//    public void deleteTour(@PathVariable Long id) {
//        tourService.deleteTour(id);
//    }
//	
//}

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

