package com.tours.service;

import java.util.List;

import com.tours.DTO.BookingRespDTO;

import com.tours.DTO.ApiResponse;

public interface BookingService {
    BookingRespDTO bookTour(BookingRespDTO bookingDTO);
    List<BookingRespDTO> getBookingsByUser(Long userId);
    ApiResponse cancelBooking(Long bookingId);

}
