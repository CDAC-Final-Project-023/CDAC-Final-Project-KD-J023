package com.tours.DTO;

import com.tours.entity.Region;
import com.tours.entity.City;

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
    private Region region;
    private String photoPath;
    
    public void setPhotoPath(String photoFilename) {
        if (photoFilename != null) {
            this.photoPath =  photoFilename;
        } else {
            this.photoPath = null;
        }
    }

   
}
