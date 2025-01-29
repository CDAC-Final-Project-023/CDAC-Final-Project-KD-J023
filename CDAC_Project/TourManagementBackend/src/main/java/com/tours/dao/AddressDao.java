package com.tours.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tours.entity.Address;

public interface AddressDao extends JpaRepository<Address, Long> {

}
