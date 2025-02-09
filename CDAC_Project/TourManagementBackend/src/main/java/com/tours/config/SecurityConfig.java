package com.tours.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors().and() // Enable CORS
            .csrf().disable() // Disable CSRF for development (optional)
            .authorizeHttpRequests(auth -> auth.anyRequest().permitAll()); // Allow all requests (modify as needed)
        return http.build();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {  // ✅ Defines the PasswordEncoder bean
        return new BCryptPasswordEncoder();
    }
}
