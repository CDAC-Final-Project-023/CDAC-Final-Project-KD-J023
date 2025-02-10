package com.tours.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnalyticsResponseDTO {
    private BigDecimal totalRevenue;
    private long totalBookings;
    private long totalReviews;
    private List<Object[]> mostBookedTours;
    private List<Object[]> topRatedTours;
}
