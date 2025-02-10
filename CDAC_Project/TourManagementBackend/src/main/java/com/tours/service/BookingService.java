package com.tours.service;

import java.util.List;

import com.tours.dto.BookingDTO;
import com.tours.dto.BookingUpdateDTO;
import com.tours.dto.ApiResponse;

public interface BookingService {
    BookingDTO bookTour(BookingDTO bookingDTO);
    List<BookingDTO> getAllBookings();
    List<BookingDTO> getBookingsByUser(Long userId);
    ApiResponse cancelBooking(Long bookingId);
    ApiResponse approveBooking(Long bookingId);
    ApiResponse modifyBooking(Long bookingId, BookingUpdateDTO updateDTO);
}
