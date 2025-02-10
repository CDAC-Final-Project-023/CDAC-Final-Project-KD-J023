package com.tours.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tours.DTO.BookingDTO;
import com.tours.dao.BookingRepository;
import com.tours.dao.TourRepo;
import com.tours.dao.TouristRepository;
import com.tours.dao.UserRepository;
import com.tours.entity.Booking;
import com.tours.entity.Tour;
import com.tours.entity.Tourist;
import com.tours.entity.Tours;
import com.tours.entity.UserSignUp;
import com.tours.entity.Booking;



@Service
public class BookingServices {
   @Autowired
	private  BookingRepository bookingRepository;
    @Autowired
    private UserRepository userepo;
    @Autowired
    private TouristRepository touristrepo;
    @Autowired
    private TourRepo tourRepo;
    
    @Autowired
    private ModelMapper mapper;

//    public BookingServices(BookingRepository bookingRepository) {
//        this.bookingRepository = bookingRepository;
//       
//    }

    public Booking saveBooking(BookingDTO booking, Long tourId) {
    	            
    	 UserSignUp user=userepo.findById(booking.getUser_id()).orElseThrow(null);
    	 Tours tour=tourRepo.findById(tourId).orElseThrow(null);    	 
    	 
    	 System.out.println(user);
    	Booking b1= mapper.map(booking, Booking.class);
    	//System.out.println(b1.getDestination());
    	
    	
    	b1.setUser(user);
    	 List<Tourist> tourists = booking.getTourists().stream()
                 .map(touristRequest -> {
                     Tourist tourist = mapper.map(touristRequest, Tourist.class);
                     
                     // If Tourist has an ID, fetch from DB (to attach it)
                     if (tourist.getId() != null) {
                         tourist = touristrepo.findById(tourist.getId())
                                 .orElseThrow(() -> new RuntimeException("Tourist not found"));
                     }else {
                    	 tourist = mapper.map(touristRequest, Tourist.class);
                     }

                     tourist.setBooking(b1);  // Associate with Booking
                     return tourist;
                 })
                 .collect(Collectors.toList());

           
    	
    	b1.setTourists(tourists);
    	b1.setTour(tour);
    	b1.setGrandTotal();
    	//b1.setTour(tour);
        return bookingRepository.save(b1);
        
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
    
    
//    @Autowired
//    private TouristRepository touristRepository;
//
//    @Autowired
//    private UserSignUpRepository userSignUpRepository;
//
//    public Booking createBookingWithTourists(Long userId, Booking bookingRequest, List<Tourist> tourists) {
//        // Fetch the user by ID (this should be already available from the front-end request)
//        UserSignUp user = userSignUpRepository.findById(userId)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        // Set the user for the booking
//        bookingRequest.setUser(user);
//
//        // Save the booking first
//        Booking savedBooking = bookingRepository.save(bookingRequest);
//
//        // Set the savedBooking to each tourist and save them
//        for (Tourist tourist : tourists) {
//            tourist.setBooking(savedBooking); // Associate booking with tourist
//            touristRepository.save(tourist);   // Save the tourist
//        }
//
//        // Return the saved booking object
//        return savedBooking;
//    }
}
