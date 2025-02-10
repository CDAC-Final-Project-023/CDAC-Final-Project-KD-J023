package com.tours.DTO;

import java.time.LocalDate;

import com.tours.entity.BookingStatus;
import com.tours.entity.Tour;
import com.tours.entity.User;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingRespDTO {
    private Long id;
    private User user;
    private Tour tour;
    private LocalDate bookingDate;
    private BookingStatus status;
}
