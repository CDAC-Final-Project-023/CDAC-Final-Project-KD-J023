package com.tours.DTO;

import com.tours.entity.Photo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
public class ToursRespDTO {
	private Long id;
    private String title;
    private String description;
    private double price;
    private String status;
    private String cityName;
    private String stateName;
    private String categoryName;
    private String photoPath;
}
