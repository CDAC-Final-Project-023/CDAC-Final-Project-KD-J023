package com.tours.service;

import com.tours.DTO.BookingDTO;
import com.tours.dao.BookingDao;
import com.tours.dao.ToursDao;
import com.tours.entity.Booking;
import com.tours.entity.BookingStatus;
import com.tours.entity.Tour;
import com.tours.service.BookingService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingDao bookingDao;

    @Autowired
    private ToursDao toursDao;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<BookingDTO> getAllBookings() {
        return bookingDao.findAll().stream()
                .map(this::convertToDto) // Convert to DTO with tour & user names
                .collect(Collectors.toList());
    }

    @Override
    public BookingDTO approveBooking(Long bookingId) {
        Booking booking = getBookingById(bookingId);
        booking.setStatus(BookingStatus.APPROVED);
        return convertToDto(bookingDao.save(booking));
    }

    @Override
    public BookingDTO modifyBooking(Long bookingId, LocalDate newDate) {
        Booking booking = getBookingById(bookingId);
        booking.setBookingDate(newDate);
        return convertToDto(bookingDao.save(booking));
    }

    @Override
    public BookingDTO cancelBooking(Long bookingId) {
        Booking booking = getBookingById(bookingId);
        booking.setStatus(BookingStatus.CANCELLED);
        return convertToDto(bookingDao.save(booking));
    }

    @Override
    public void updateBooking(Long id, BookingDTO bookingDTO) {
        Optional<Booking> optionalBooking = bookingDao.findById(id);
        if (optionalBooking.isPresent()) {
            Booking booking = optionalBooking.get();
            booking.setBookingDate(bookingDTO.getBookingDate());

            if (bookingDTO.getTourId() != null) {
                Tour tour = toursDao.findById(bookingDTO.getTourId())
                        .orElseThrow(() -> new RuntimeException("Tour not found"));
                booking.setTour(tour);
            }

            bookingDao.save(booking);
        } else {
            throw new RuntimeException("Booking not found");
        }
    }

    private Booking getBookingById(Long bookingId) {
        return bookingDao.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    }

    private BookingDTO convertToDto(Booking booking) {
        BookingDTO dto = modelMapper.map(booking, BookingDTO.class);
        dto.setTourName(booking.getTour().getTitle()); // Get tour name
        dto.setUserName(booking.getUser().getFirstName() + " " + booking.getUser().getLastName()); // Get full user name
        return dto;
    }
}
