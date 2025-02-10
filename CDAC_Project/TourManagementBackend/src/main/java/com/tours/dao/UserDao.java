package com.tours.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tours.entity.User;

public interface UserDao extends JpaRepository<User,Long> {
	//User findByEmail(String email);
	Boolean existsByEmail(String email);
	 Optional<User> findByEmail(String email);
	
}
