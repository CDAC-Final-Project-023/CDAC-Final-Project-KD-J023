package com.tours.dao;



import org.springframework.data.jpa.repository.JpaRepository;

import com.tours.entity.State;

public interface StateDao extends JpaRepository<State, Long> {
}
