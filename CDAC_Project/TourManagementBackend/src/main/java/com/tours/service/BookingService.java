package com.tours.service;

import java.util.List;

import com.tours.DTO.BookingRespDTO;

import com.tours.DTO.ApiResponse;
import com.tours.DTO.BookingReqDTO;

public interface BookingService {
    BookingRespDTO createBooking(BookingReqDTO bookingReqDTO);
    List<BookingRespDTO> getBookingsByUser(Long userId);
    ApiResponse cancelBooking(Long bookingId);

}
