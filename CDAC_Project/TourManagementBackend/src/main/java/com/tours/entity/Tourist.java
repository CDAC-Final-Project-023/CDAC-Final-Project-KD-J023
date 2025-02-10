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
import lombok.ToString;

@Entity
@Table(name = "Tourist")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
public class Tourist extends BaseEntity{
	
		@Column
	    private String name;
		@Column
	    private int age;
		@Column
	    private String gender;

	    @ManyToOne
	    @JoinColumn(name = "booking_id")
	    private Booking booking;

}
