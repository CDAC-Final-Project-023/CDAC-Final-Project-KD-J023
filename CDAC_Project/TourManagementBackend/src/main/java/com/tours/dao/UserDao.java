package com.tours.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.tours.entity.User;

public interface UserDao extends JpaRepository<User,Long> {

	Boolean existsByEmail(String email);
	List<User> findByDeletedFalse();
	User findByEmail(String email);
	
}
