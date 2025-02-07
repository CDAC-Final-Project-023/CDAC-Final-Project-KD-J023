package com.tours.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseEntity {

    @Column(name= "first_name", nullable = false, length = 50)
    private String firstName;

    @Column(name= "last_name", nullable = false, length = 50)
    private String lastName;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(name= "mobile_number", nullable = false, length = 15)
    private String mobileNumber;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role = UserRole.USER;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserStatus status = UserStatus.ACTIVE;

    @OneToOne
    @JoinColumn(name = "photo_id")
    private Photo photo;

    @OneToOne
    @JoinColumn(name = "address_id")
    private Address address;

    @Column(nullable = false)
    private boolean deleted = false; 
}
