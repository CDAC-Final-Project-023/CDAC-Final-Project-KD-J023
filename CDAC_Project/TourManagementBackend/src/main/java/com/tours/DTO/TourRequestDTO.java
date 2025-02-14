package com.tours.DTO;

import lombok.Data;

@Data
public class TourRequestDTO {
    private String title;
    private String description;
    private double price;
    private String status;
    private Long regionId;  
    private Long cityId;
}

