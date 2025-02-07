package com.tours.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tours.entity.User;

public interface UserDao extends JpaRepository<User,Long> {
	List<User> findByDeletedFalse();
}
