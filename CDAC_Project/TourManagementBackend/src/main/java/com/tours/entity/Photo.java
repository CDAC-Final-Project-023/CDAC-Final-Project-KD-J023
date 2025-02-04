package com.tours.entity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "Photo")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Photo extends BaseEntity {

    @Column(nullable = false)
    private String photoPath; 
    
}
