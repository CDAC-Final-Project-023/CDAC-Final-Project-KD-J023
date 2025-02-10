package com.tours.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tours.DTO.UserDTO;
import com.tours.dao.UserDao;
import com.tours.entity.User;
import com.tours.entity.UserStatus;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserAdminServiceImpl implements UserAdminService {

	@Autowired
	private UserDao userDao;

	@Override
	public List<UserDTO> getAllUsers() {
		return userDao.findAll().stream().filter(user -> !user.isDeleted())
				.map(user -> new UserDTO(user.getId(), user.getFirstName(), user.getLastName(), user.getEmail(),
						user.getMobileNumber(), user.getRole().toString(), user.getStatus().toString()))
				.collect(Collectors.toList());
	}

	@Override
	public UserDTO blockUnblockUser(Long id, String status) {
		User user = userDao.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

		try {
			UserStatus newStatus = UserStatus.valueOf(status.toUpperCase());
			user.setStatus(newStatus);
			userDao.save(user);
			return new UserDTO(user.getId(), user.getFirstName(), user.getLastName(), user.getEmail(),
					user.getMobileNumber(), user.getRole().toString(), user.getStatus().toString());
		} catch (IllegalArgumentException e) {
			throw new RuntimeException("Invalid status value. Allowed values: ACTIVE, BLOCKED");
		}
	}



	@Override
	public void softDeleteUser(Long id) {
		User user = userDao.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

		user.setDeleted(true);
		userDao.save(user);
	}
}
