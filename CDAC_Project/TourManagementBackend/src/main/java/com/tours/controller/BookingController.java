package com.tours.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tours.DTO.BookingDTO;
import com.tours.entity.Booking;
import com.tours.service.BookingServices;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/bookings")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")

public class BookingController {
    private final BookingServices bookingService;

    public BookingController(BookingServices bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("/create/{tourId}")
    public ResponseEntity<Booking> createBooking(@RequestBody BookingDTO booking,@PathVariable Long tourId, @RequestHeader("Authorization") String authorization) {
    	// Check if Authorization header contains a token
       
    	System.out.println(booking);
    	return ResponseEntity.ok(bookingService.saveBooking(booking,tourId));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }
    
    

    
//    @PostMapping("/create")
//    public ResponseEntity<Booking> createBooking(@RequestBody Booking bookingRequest) {
//        // Prepare the booking object with data from the request
//        Booking booking = new Booking();
//        booking.setDestination(bookingRequest.getDestination());
//        booking.setNumTourists(bookingRequest.getNumTourists());
//        booking.setTotalPrice(bookingRequest.getTotalPrice());
//        booking.setTax(bookingRequest.getTax());
//        booking.setGrandTotal(bookingRequest.getGrandTotal());
//
//        // Prepare the tourists list from the request
//        List<Tourist> tourists = new ArrayList<>();
//        for (Tourist touristRequest : bookingRequest.getTourists()) {
//            Tourist tourist = new Tourist();
//            tourist.setFullName(touristRequest.getFullName());
//            tourist.setAge(touristRequest.getAge());
//            tourist.setGender(touristRequest.getGender());
//            tourists.add(tourist);
//        }
//
//        // Call the service method to save the booking and tourists
//        Long userId = bookingRequest.getId();
//        Booking createdBooking = bookingService.createBookingWithTourists(userId, booking, tourists);
//
//        // Return the created booking response
//        return ResponseEntity.ok(createdBooking);
    
}

