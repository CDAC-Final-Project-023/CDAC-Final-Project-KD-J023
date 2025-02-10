package com.tours.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tours.dao.BookingDao;
import com.tours.dao.TourDao;
import com.tours.dao.UserDao;
import com.tours.dto.BookingDTO;
import com.tours.dto.BookingUpdateDTO;
import com.tours.dto.ApiResponse;
import com.tours.entity.Booking;
import com.tours.entity.BookingStatus;
import com.tours.entity.Tour;
import com.tours.entity.User;
import com.tours.exceptions.*;

@Service
@Transactional
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingDao bookingDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private TourDao tourDao;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public BookingDTO bookTour(BookingDTO bookingDTO) {
        User user = userDao.findById(bookingDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Tour tour = tourDao.findById(bookingDTO.getTourId())
                .orElseThrow(() -> new ResourceNotFoundException("Tour not found"));

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setTour(tour);
        booking.setBookingDate(bookingDTO.getBookingDate());
        booking.setStatus(BookingStatus.PENDING);

        Booking savedBooking = bookingDao.save(booking);
        return modelMapper.map(savedBooking, BookingDTO.class);
    }

    @Override
    public List<BookingDTO> getAllBookings() {
        return bookingDao.findAll().stream()
                .map(booking -> modelMapper.map(booking, BookingDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<BookingDTO> getBookingsByUser(Long userId) {
        return bookingDao.findAll().stream()
                .filter(booking -> booking.getUser().getId().equals(userId))
                .map(booking -> modelMapper.map(booking, BookingDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public ApiResponse cancelBooking(Long bookingId) {
        Booking booking = bookingDao.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        booking.setStatus(BookingStatus.CANCELLED);
        return new ApiResponse("Booking cancelled successfully.");
    }

    @Override
    public ApiResponse approveBooking(Long bookingId) {
        Booking booking = bookingDao.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        booking.setStatus(BookingStatus.CONFIRMED);
        return new ApiResponse("Booking approved successfully.");
    }

    @Override
    public ApiResponse modifyBooking(Long bookingId, BookingUpdateDTO updateDTO) {
        Booking booking = bookingDao.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        booking.setBookingDate(updateDTO.getNewBookingDate());
        return new ApiResponse("Booking modified successfully.");
    }
}
