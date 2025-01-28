//package com.project.toursManagment.controller;
//
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.multipart.MultipartFile;
//
//import com.project.toursManagment.entity.Tour;
//import com.project.toursManagment.service.TourService;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//
//@RestController
//@RequestMapping("/api/tours")
//public class TourController {
//
//    @Autowired
//    private TourService tourService;
//
//    @GetMapping
//    public List<Tour> getAllTours() {
//        return tourService.getAllTours();
//    }
//
//    @PostMapping(consumes = {"multipart/form-data"})
//    public ResponseEntity<?> createTour(
//            @RequestParam("title") String title,
//            @RequestParam("description") String description,
//            @RequestParam("price") String price,
//            @RequestParam("status") String status,
//            @RequestParam("image") MultipartFile image) {
//
//        try {
//            // Save tour details (you can also process/save the image file here)
////            Tour tour = new Tour(title, description, Double.parseDouble(price), status);
////            tourService.createTour(tour);
////            return ResponseEntity.ok(tour);
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body("Failed to create tour: " + e.getMessage());
//        }
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<?> updateTour(
//            @PathVariable Long id,
//            @RequestParam("title") String title,
//            @RequestParam("description") String description,
//            @RequestParam("price") String price,
//            @RequestParam("status") String status,
//            @RequestParam(value = "image", required = false) MultipartFile image) {
//
//        try {
//            // Update tour details (you can also process/save the image file here)
////            Tour updatedTour = tourService.updateTour(id, new Tour(title, description, Double.parseDouble(price), status));
////            return ResponseEntity.ok(updatedTour);
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body("Failed to update tour: " + e.getMessage());
//        }
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<?> deleteTour(@PathVariable Long id) {
//        try {
//            tourService.deleteTour(id);
//            return ResponseEntity.ok().build();
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body("Failed to delete tour: " + e.getMessage());
//        }
//    }
//}
