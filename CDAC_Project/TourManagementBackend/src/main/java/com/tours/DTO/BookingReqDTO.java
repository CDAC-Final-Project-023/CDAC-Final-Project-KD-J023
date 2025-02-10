package com.tours.DTO;


import java.util.List;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BookingReqDTO {

	
    private long user;

    private long tour;

    private int count;
    private double baseAmount;

    private List<TouristReqDTO> tourists;
}
