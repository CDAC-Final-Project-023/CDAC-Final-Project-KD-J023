package com.tours.dto;

import java.time.LocalDate;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingUpdateDTO {
    private LocalDate newBookingDate;
}
