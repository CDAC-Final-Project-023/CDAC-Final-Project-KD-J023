package com.tours.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.*;

@Entity
@Table(name = "State")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor 
public class State extends BaseEntity {
	
	 @Column(name= "name",nullable = false, length = 50)
	    private String StateName;
	 

}
