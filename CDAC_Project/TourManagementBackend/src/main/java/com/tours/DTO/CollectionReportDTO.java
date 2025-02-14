package com.tours.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;

@Data
@AllArgsConstructor
public class CollectionReportDTO {
    private double totalCollections;
    private List<MonthlyCollectionDTO> collectionHistory;
}
