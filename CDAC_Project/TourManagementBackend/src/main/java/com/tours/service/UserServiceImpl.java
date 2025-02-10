package com.tours.service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.tours.DTO.Credentials;
import com.tours.DTO.UserResponseDTO;
import com.tours.DTO.UserUpdateDTO;
import com.tours.dao.UserDao;
import com.tours.entity.Photo;
import com.tours.entity.User;

import io.jsonwebtoken.io.IOException;

@Service
@Transactional
public class UserServiceImpl implements UserService, UserDetailsService {

	private static final Logger LOGGER = org.slf4j.LoggerFactory.getLogger(UserServiceImpl.class);
	@Autowired
	@Lazy
	private PasswordEncoder passwordEncoder;

	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private UserDao userDao;

	@Autowired
	public UserServiceImpl(UserDao userDao) {
		this.userDao = userDao;
	}

	@Override
	public User getUserByEmail(String email) {
		User dbUser = userDao.findByEmail(email);
		return dbUser;
	}

	@Override
	public User getUserByCredentials(Credentials cr) {
		User dbUser = userDao.findByEmail(cr.getEmail());
		if (dbUser != null && dbUser.getPassword().equals(cr.getPassword()))
			return dbUser;
		return null;
	}

	@Override
	public User loadUserByUsername(String email) throws UsernameNotFoundException {
		User dbUser = userDao.findByEmail(email);
		if (dbUser == null)
			throw new UsernameNotFoundException("No user exists!");
		return dbUser;
	}

	@Override
	public String registerUser(User user, MultipartFile profilePhoto) {
		try {
			// Check if email already exists
			if (userDao.existsByEmail(user.getEmail())) {
				return "Email already exists!";
			}

			if (profilePhoto != null && !profilePhoto.isEmpty()) {
				String uploadsDir = "src/main/resources/static/uploads/";
				String originalFileName = profilePhoto.getOriginalFilename();

				String sanitizedFileName = originalFileName.replace(" ", "_");

				Path filePath = Paths.get(uploadsDir, sanitizedFileName);
				Files.createDirectories(filePath.getParent());
				Files.write(filePath, profilePhoto.getBytes());

				Photo photo = new Photo();
			
				photo.setPhotoPath(sanitizedFileName);

		
				user.setPhoto(photo);
			}

	
			user.setPassword(passwordEncoder.encode(user.getPassword()));

			userDao.save(user);

			return "User registered successfully!";
		} catch (IOException | java.io.IOException e) {
			throw new RuntimeException("Error saving profile photo", e);
		}
	}

	@Override
	public UserResponseDTO getUserById(Long userId) {
		User user = userDao.findById(userId).orElseThrow();

		return modelMapper.map(user, UserResponseDTO.class);
	}

	@Override
	public User loginUser(String email, String password) {

		return null;
	}

	@Override
	public String getUserPhoto(Long userId) {
		User user = userDao.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
		return (user.getPhoto() != null) ? user.getPhoto().getPhotoPath() : null;
	}
	
	
    @Override
    public void updateUser(Long userId, UserUpdateDTO userUpdateDTO) {
        User user = userDao.findById(userId)
                .orElseThrow();

        user.setFirstName(userUpdateDTO.getFirstName());
        user.setLastName(userUpdateDTO.getLastName());
        user.setEmail(userUpdateDTO.getEmail());
        user.setMobileNumber(userUpdateDTO.getMobile());

        // Update password only if a new one is provided
        if (userUpdateDTO.getNewPassword() != null && !userUpdateDTO.getNewPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userUpdateDTO.getNewPassword()));
        }

        userDao.save(user);
    }

}
