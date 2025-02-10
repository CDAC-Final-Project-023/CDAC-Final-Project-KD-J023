package com.tours.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tours.DTO.BookingDTO;
import com.tours.service.BookingAdminService;

import java.util.List;

@RestController
@RequestMapping("/admin/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingAdminController {

	@Autowired
    private BookingAdminService bookingService;


    @GetMapping
    public ResponseEntity<List<BookingDTO>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateBooking(@PathVariable Long id, @RequestBody BookingDTO bookingDTO) {
        bookingService.updateBooking(id, bookingDTO);
        return ResponseEntity.ok("Booking updated successfully.");
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<String> approveBooking(@PathVariable Long id) {
        bookingService.approveBooking(id);
        return ResponseEntity.ok("Booking approved successfully.");
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<String> cancelBooking(@PathVariable Long id) {
        bookingService.cancelBooking(id);
        return ResponseEntity.ok("Booking canceled successfully.");
    }
}
