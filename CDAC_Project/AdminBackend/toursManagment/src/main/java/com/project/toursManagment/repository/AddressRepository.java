package com.project.toursManagment.repository;

import com.project.toursManagment.entity.Address;
import org.springframework.data.repository.CrudRepository;

public interface AddressRepository extends CrudRepository<Address, Long> {
    // Custom query methods can go here if needed
}
