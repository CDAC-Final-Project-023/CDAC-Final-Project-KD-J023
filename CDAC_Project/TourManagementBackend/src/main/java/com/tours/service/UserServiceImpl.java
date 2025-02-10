package com.tours.service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

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
import com.tours.dao.UserDao;
import com.tours.entity.Photo;
import com.tours.entity.User;

import io.jsonwebtoken.io.IOException;
@Service
@Transactional
public class UserServiceImpl implements UserService,UserDetailsService {
	
	private static final Logger LOGGER = org.slf4j.LoggerFactory.getLogger(UserServiceImpl.class);
	@Autowired
	@Lazy
	private PasswordEncoder passwordEncoder;

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
		if(dbUser != null && dbUser.getPassword().equals(cr.getPassword()))
			return dbUser;
		return null;
	}
	
	@Override
	public User loadUserByUsername(String email) throws UsernameNotFoundException {
		User dbUser = userDao.findByEmail(email);
		if(dbUser == null)
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

	            // Ensure the uploads directory exists
	            Files.createDirectories(filePath.getParent());

	            // Save the file
	            Files.write(filePath, profilePhoto.getBytes());

	            Photo photo = new Photo();
	            //change: Save sanitized filename in the database
	            photo.setPhotoPath(sanitizedFileName);

	            // Save the photo to the database
	            user.setPhoto(photo);
	        }

	        // Encode the password
	        user.setPassword(passwordEncoder.encode(user.getPassword()));

	        // Save the user to the database
	        userDao.save(user);

	        return "User registered successfully!";
	    } catch (IOException | java.io.IOException e) {
	        throw new RuntimeException("Error saving profile photo", e);
	    }
	}






	@Override
	public User loginUser(String email, String password) {
		
		return null;
	}
	
	 @Override
	    public String getUserPhoto(Long userId) {
	        User user = userDao.findById(userId)
	                .orElseThrow(() -> new RuntimeException("User not found"));
	        return (user.getPhoto() != null) ? user.getPhoto().getPhotoPath() : null;
	    }

}
