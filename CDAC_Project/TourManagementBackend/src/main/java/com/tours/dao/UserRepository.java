package com.tours.dao;


import org.springframework.data.jpa.repository.JpaRepository;

import com.tours.entity.UserSignUp;

public interface UserRepository extends JpaRepository<UserSignUp, Long> {
    boolean existsByEmail(String email);
    UserSignUp findByEmail(String email);
    
}
