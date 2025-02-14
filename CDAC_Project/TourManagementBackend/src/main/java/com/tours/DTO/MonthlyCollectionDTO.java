package com.tours.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MonthlyCollectionDTO {
    private String month;
    private double amount;
}

