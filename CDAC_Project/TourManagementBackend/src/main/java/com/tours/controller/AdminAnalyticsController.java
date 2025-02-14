package com.tours.controller;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import com.tours.DTO.AnalyticsResponseDTO;
import com.tours.service.AnalyticsService;

@RestController
@RequestMapping("/api/admin/analytics")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminAnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    @GetMapping
    public AnalyticsResponseDTO getAdminAnalytics() {
        return analyticsService.getAnalytics();
    }
    

}
