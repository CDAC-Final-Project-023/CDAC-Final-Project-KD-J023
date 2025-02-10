package com.tours.dto;

import java.time.LocalDate;

import com.tours.entity.BookingStatus;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingDTO {
    private Long id;
    private Long userId;
    private Long tourId;
    private LocalDate bookingDate;
    private BookingStatus status;
}
