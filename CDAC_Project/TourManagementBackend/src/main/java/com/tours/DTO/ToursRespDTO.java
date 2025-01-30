package com.tours.DTO;

import com.tours.entity.Category;
import com.tours.entity.City;
import com.tours.entity.Photo;
import com.tours.entity.State;

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
    private City city;
    private State state;
    private Category category;
    private String photoPath;
   
}
