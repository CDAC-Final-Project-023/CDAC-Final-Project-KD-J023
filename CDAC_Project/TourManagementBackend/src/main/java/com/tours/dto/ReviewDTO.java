package com.tours.DTO;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ReviewDTO extends BaseDTO{
    private float rating;
    private String comment;
    @NotNull
    private Long userId;
    private Long tourId;
}
