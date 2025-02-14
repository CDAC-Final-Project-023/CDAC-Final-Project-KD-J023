package com.tours.DTO;

public class BookingStatusDTO {
    private String status;
    private Long count;

    // Default constructor (required by JPA)
    public BookingStatusDTO() {}

    // Parameterized constructor (matches query)
    public BookingStatusDTO(String status, Long count) {
        this.status = status;
        this.count = count;
    }

    // Getters and setters
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Long getCount() { return count; }
    public void setCount(Long count) { this.count = count; }
}
