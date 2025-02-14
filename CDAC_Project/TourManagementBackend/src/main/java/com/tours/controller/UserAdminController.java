package com.tours.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.tours.DTO.UserDTO;
import com.tours.entity.UserStatus;
import com.tours.service.UserAdminService;

import java.util.List;

@RestController
@RequestMapping("admin/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserAdminController {

    @Autowired
    private UserAdminService userService;

    @GetMapping
    public List<UserDTO> getUsers() {
        return userService.getAllUsers();
    }

    @PutMapping("/{id}/status")
    public UserDTO blockUnblockUser(@PathVariable Long id, @RequestParam String status) {
        System.out.println("Received status: " + status);  // Debugging log
        return userService.blockUnblockUser(id, status);
    }



    @DeleteMapping("/{id}")
    public String softDeleteUser(@PathVariable Long id) {
        userService.softDeleteUser(id);
        return "User with ID " + id + " has been soft deleted successfully.";
    }
}
