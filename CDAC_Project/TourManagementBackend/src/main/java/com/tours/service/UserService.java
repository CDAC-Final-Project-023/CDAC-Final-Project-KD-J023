package com.tours.service;

import org.springframework.web.multipart.MultipartFile;

import com.tours.DTO.Credentials;
import com.tours.DTO.UserResponseDTO;
import com.tours.DTO.UserUpdateDTO;
import com.tours.entity.User;

public interface UserService {
	User getUserByEmail(String email);

	User getUserByCredentials(Credentials cr);

	String registerUser(User user, MultipartFile profilePhoto);

	User loginUser(String email, String password);

	String getUserPhoto(Long id);

	UserResponseDTO getUserById(Long userId);

	void updateUser(Long userId, UserUpdateDTO userUpdateDTO);

}
