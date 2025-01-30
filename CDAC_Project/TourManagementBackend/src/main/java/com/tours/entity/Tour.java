package com.tours.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;

@Entity
@Table(name = "Tours")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Tour extends BaseEntity {

    @Column(nullable = false, length = 100)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TourStatus status = TourStatus.ACTIVE;

    @Column(name = "city_id")
    private Long cityId;

    @Column(name = "state_id")
    private Long stateId;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
