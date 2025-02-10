package com.tours.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tours.DTO.BookingDTO;
import com.tours.service.BookingService;

import java.util.List;

@RestController
@RequestMapping("/admin/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

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
