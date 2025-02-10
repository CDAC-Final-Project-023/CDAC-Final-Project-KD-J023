package com.tours.DTO;

import lombok.Data;

@Data
public class TourResponseDTO {
    private Long id;
    private String title;
    private String description;
    private double price;
    private String status;
    private String photoUrl;
    private String region;
    private String city;  
    
    public void setPhotoPath(String photoFilename) {
        if (photoFilename != null) {
            this.photoUrl =  photoFilename;
        } else {
            this.photoUrl = null;
        }
    }
}
