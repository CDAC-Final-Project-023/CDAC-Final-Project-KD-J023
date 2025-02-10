package com.tours.DTO;


import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ReviewDTO {
    private Long id;
    private int rating;
    private String comment;
    private Long userId;  
    private Long tourId;
}

