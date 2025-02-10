package com.tours.entity;

import lombok.*;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "Region")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
public class Region extends BaseEntity {

	@Column(name = "name", nullable = false, length = 100, unique = true)
    private String name;

}