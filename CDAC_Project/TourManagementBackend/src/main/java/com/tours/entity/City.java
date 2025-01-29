package com.tours.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
	 
	 
	 
	 @ManyToOne
	 @JoinColumn(name = "state_id")
	 private State state;
	

}
