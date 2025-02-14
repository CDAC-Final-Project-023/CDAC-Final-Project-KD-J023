package com.tours.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tours.DTO.AnalyticsResponseDTO;
import com.tours.dao.BookingDao;
import com.tours.dao.ReviewDao;
import com.tours.entity.BookingStatus;

import java.math.BigDecimal;
import java.util.List;

@Service
public class AnalyticsService {

    @Autowired
    private BookingDao bookingDAO;

    @Autowired
    private ReviewDao reviewDAO;

    public AnalyticsResponseDTO getAnalytics() {
    	BigDecimal totalRevenue = bookingDAO.getTotalRevenue();
        long totalBookings = bookingDAO.count();
        long totalReviews = reviewDAO.getTotalReviews();
        List<Object[]> mostBookedTours = bookingDAO.findMostBookedTours();
        List<Object[]> topRatedTours = reviewDAO.findTopRatedTours();

        return new AnalyticsResponseDTO(
                totalRevenue != null ? totalRevenue : BigDecimal.ZERO,
                totalBookings,
                totalReviews,
                mostBookedTours,
                topRatedTours
        );
    }
}

