package com.tours.service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tours.dao.BookingDao;
import com.tours.dao.TouristDao;
import com.tours.dao.ToursDao;
import com.tours.dao.UserDao;
import com.tours.email.EmailService;
import com.tours.email.ReceiptGeneratorService;
import com.tours.DTO.*;

import com.tours.entity.Booking;
import com.tours.entity.BookingStatus;
import com.tours.entity.Tour;
import com.tours.entity.Tourist;
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
    private ToursDao tourDao;
    
    @Autowired
    private TouristDao touristDao;

    @Autowired
    private ModelMapper modelMapper;
    
    @Autowired
    private ReceiptGeneratorService receiptGeneratorService;

    @Autowired
    private EmailService emailService;

    @Override
    public BookingRespDTO createBooking(BookingReqDTO bookingReqDTO) {
        // Fetch User and Tour
        User user = userDao.findById(bookingReqDTO.getUser())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        System.out.println(user);
        Tour tour = tourDao.findById(bookingReqDTO.getTour())
                .orElseThrow(() -> new ResourceNotFoundException("Tour not found"));

        // Calculate base and total amounts
        double baseAmount = tour.getPrice() * bookingReqDTO.getCount();
        double totalAmount = baseAmount + (int) (baseAmount * 0.18);

        // Create Booking
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setTour(tour);
        booking.setBookingDate(LocalDate.now());
        booking.setCount(bookingReqDTO.getCount());
        booking.setStatus(BookingStatus.PENDING);
        booking.setBaseAmount(baseAmount);
        booking.setTotalAmount(totalAmount);

        Booking savedBooking = bookingDao.save(booking);

        // Save Tourist Details
        if (bookingReqDTO.getTourists() != null && !bookingReqDTO.getTourists().isEmpty()) {
            List<Tourist> tourists = bookingReqDTO.getTourists().stream()
                    .map(touristDTO -> {
                        Tourist tourist = new Tourist();
                        tourist.setName(touristDTO.getName());
                        tourist.setAge(touristDTO.getAge());
                        tourist.setGender(touristDTO.getGender());
                        tourist.setBooking(savedBooking);
                        return tourist;
                    }).collect(Collectors.toList());

            touristDao.saveAll(tourists);
        }
        
        List<Tourist> members =touristDao.findByBooking(savedBooking);
        
        String[][] touristDetails = new String[members.size()][3];
        for (int i = 0; i < members.size(); i++) {
            touristDetails[i][0] = members.get(i).getName();
            touristDetails[i][1] = String.valueOf(members.get(i).getAge());
            touristDetails[i][2] = members.get(i).getGender();
        }

        // Format booking date
        String formattedBookingDate = savedBooking.getCreatedAt().toLocalDate().toString();


        // Generate receipt PDF
        byte[] receiptPdf = receiptGeneratorService.generateReceipt(user.getFirstName(),user.getLastName(),user.getEmail()
        															,user.getMobileNumber(),tour.getTitle(),tour.getDescription()
        															,booking.getTotalAmount(),formattedBookingDate,booking.getCount(),touristDetails);

        // Send email with receipt
        emailService.sendReceiptEmail(user.getEmail(), user.getFirstName(), totalAmount, tour.getTitle(), receiptPdf);
        return modelMapper.map(savedBooking, BookingRespDTO.class);
    }
	

 

    @Override
    public List<BookingRespDTO> getBookingsByUser(Long userId) {
        return bookingDao.findAll().stream()
                .filter(booking -> booking.getUser().getId().equals(userId))
                .map(booking -> modelMapper.map(booking, BookingRespDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public ApiResponse cancelBooking(Long bookingId) {
        Booking booking = bookingDao.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        booking.setStatus(BookingStatus.CANCELLED);
        return new ApiResponse("Booking cancelled successfully.");
    }



	
	

   
}
