package com.tours.DTO;

import java.time.LocalDate;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookingDTO {
    private Long id;
    private Long tourId;
    private String tourName; 
    private Long userId;
    private String userName;
    private LocalDate bookingDate;
    private String status;
}
