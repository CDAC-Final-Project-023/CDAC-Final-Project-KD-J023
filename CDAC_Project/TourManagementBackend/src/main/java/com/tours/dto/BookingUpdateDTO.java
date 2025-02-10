package com.tours.DTO;

import java.time.LocalDate;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingUpdateDTO {
    private LocalDate newBookingDate;
}
