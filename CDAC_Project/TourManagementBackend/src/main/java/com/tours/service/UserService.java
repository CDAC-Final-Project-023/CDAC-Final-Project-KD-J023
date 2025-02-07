package com.tours.service;


import java.util.List;

import com.tours.DTO.UserDTO;

public interface UserService {
    List<UserDTO> getAllUsers();
    UserDTO blockUnblockUser(Long id, String status);
    public void softDeleteUser(Long id);
}