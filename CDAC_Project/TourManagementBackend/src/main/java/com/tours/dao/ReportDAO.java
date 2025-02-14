package com.tours.dao;


import java.util.List;

import com.tours.DTO.BookingStatusDTO;
import com.tours.DTO.MonthlyCollectionDTO;
import com.tours.DTO.TourRatingDTO;

public interface ReportDAO {
    double getTotalCollections();
    List<MonthlyCollectionDTO> getCollectionHistory();
    List<TourRatingDTO> getTourRatings();
    List<BookingStatusDTO> getBookingStatusCount();
}

