package com.tours.DTO;

import java.time.LocalDate;

import com.tours.entity.BookingStatus;
import com.tours.entity.Tour;
import com.tours.entity.User;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
public class BookingRespDTO {
    private Long id;
    private User user;
    private Tour tour;
    private int count;
    private BookingStatus status;
}
