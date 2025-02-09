package com.tours.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")  // ✅ Allow CORS for all endpoints
                        .allowedOrigins("http://localhost:3000")  // ✅ Allow requests from frontend
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // ✅ Allow all HTTP methods
                        .allowedHeaders("*")  // ✅ Allow all headers
                        .allowCredentials(true); // ✅ Allow sending cookies (if needed)
            }
        };
    }
}
