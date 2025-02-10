package com.tours.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "Booking")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Booking extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "tour_id")
    private Tour tour;

    @Column(name = "booking_date", nullable = false)
    private LocalDate bookingDate;
    
    @Column(name = "person_count" ,nullable = false)
    private int count;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookingStatus status = BookingStatus.PENDING;
    
    @Column(name = "base_amount")
    private double baseAmount;
    
    @Column(name = "total_amount")
    private double totalAmount;
    
    
}
