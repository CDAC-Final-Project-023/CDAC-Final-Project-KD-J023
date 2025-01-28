package com.project.toursManagment.repository;

import com.project.toursManagment.entity.User;
import com.project.toursManagment.entity.UserStatus;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    List<User> findByStatus(UserStatus status);
}
