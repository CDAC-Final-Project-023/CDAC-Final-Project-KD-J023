package com.tours.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tours.dto.BookingDTO;
import com.tours.dto.BookingUpdateDTO;
import com.tours.dto.ApiResponse;
import com.tours.service.BookingService;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // Book a tour
    @PostMapping("/book")
    public ResponseEntity<BookingDTO> bookTour(@RequestBody BookingDTO bookingDTO) {
        return ResponseEntity.ok(bookingService.bookTour(bookingDTO));
    }

    // Get all bookings (Admin)
    @GetMapping("/all")
    public ResponseEntity<List<BookingDTO>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    // Get bookings for a specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BookingDTO>> getBookingsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(bookingService.getBookingsByUser(userId));
    }

    // Cancel a booking
    @PutMapping("/cancel/{bookingId}")
    public ResponseEntity<ApiResponse> cancelBooking(@PathVariable Long bookingId) {
        return ResponseEntity.ok(bookingService.cancelBooking(bookingId));
    }

    // Approve a booking
    @PutMapping("/approve/{bookingId}")
    public ResponseEntity<ApiResponse> approveBooking(@PathVariable Long bookingId) {
        return ResponseEntity.ok(bookingService.approveBooking(bookingId));
    }

    // Modify a booking
    @PutMapping("/modify/{bookingId}")
    public ResponseEntity<ApiResponse> modifyBooking(@PathVariable Long bookingId, @RequestBody BookingUpdateDTO updateDTO) {
        return ResponseEntity.ok(bookingService.modifyBooking(bookingId, updateDTO));
    }
}
