//package com.tours.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//            .csrf(csrf -> csrf.disable()) // Disable CSRF for APIs
//            .authorizeHttpRequests(auth -> auth
//                .requestMatchers("/admin/**").authenticated() // Protect admin routes
//                .anyRequest().permitAll() // Allow other routes to be public
//            )
//            .formLogin(form -> form.disable()) // Disable default login form
//            .httpBasic(httpBasic -> httpBasic.disable()); // Disable basic auth if not needed
//
//        return http.build();
//    }
//}
