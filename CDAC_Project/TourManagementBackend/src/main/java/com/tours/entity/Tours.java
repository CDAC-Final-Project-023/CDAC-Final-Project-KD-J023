package com.tours.entity;

import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Tours {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // Primary key for the Tour table
    private String title;  // Name of the tour
    private String description;  // Description of the tour
    private Double price;  // Price for the tour package
    private boolean isDeleted = false;  // Soft delete flag
    @OneToMany(mappedBy="tour")
    private List<Booking> booking;
    
    
}
