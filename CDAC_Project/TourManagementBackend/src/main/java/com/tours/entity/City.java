package com.tours.entity;

import com.tours.DTO.CityDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "City")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class City  extends BaseEntity{
	
	 @Column(name= "name",nullable = false, length = 50)
	    private String cityName;
	

	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "region_id")
	    private Region region; 
	

}
