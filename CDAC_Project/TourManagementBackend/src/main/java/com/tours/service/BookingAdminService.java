package com.tours.service;


import com.tours.DTO.BookingDTO;

import java.time.LocalDate;
import java.util.List;

public interface BookingAdminService {
    List<BookingDTO> getAllBookings();
    BookingDTO approveBooking(Long bookingId);
    BookingDTO modifyBooking(Long bookingId, LocalDate newDate);
    BookingDTO cancelBooking(Long bookingId);
    public void updateBooking(Long id, BookingDTO bookingDTO);
}
