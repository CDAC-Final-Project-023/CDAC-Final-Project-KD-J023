package com.tours.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tours.DTO.*;
import com.tours.service.BookingService;

@RestController
@RequestMapping("/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // Book a tour
    @PostMapping("/book")
    public ResponseEntity<BookingRespDTO> bookTour(@RequestBody BookingRespDTO bookingDTO) {
        return ResponseEntity.ok(bookingService.bookTour(bookingDTO));
    }

    

    // Get bookings for a specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BookingRespDTO>> getBookingsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(bookingService.getBookingsByUser(userId));
    }

    // Cancel a booking
    @PutMapping("/cancel/{bookingId}")
    public ResponseEntity<ApiResponse> cancelBooking(@PathVariable Long bookingId) {
        return ResponseEntity.ok(bookingService.cancelBooking(bookingId));
    }

    
}
