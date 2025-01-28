package com.project.toursManagment.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "address")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "address_line", nullable = false)
    private String addressLine;

    @Column(name = "city_name", nullable = false)
    private String cityName;

    @Column(name = "state_name", nullable = false)
    private String stateName;

    @Column(nullable = false)
    private String pincode;

}
