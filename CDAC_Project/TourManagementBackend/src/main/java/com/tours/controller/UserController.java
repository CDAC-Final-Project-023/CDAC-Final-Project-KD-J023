package com.tours.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tours.DTO.ApiResponse;
import com.tours.DTO.Credentials;
import com.tours.DTO.LoginResponse;
import com.tours.entity.User;
import com.tours.entity.UserRole;
import com.tours.entity.UserStatus;
import com.tours.security.JwtUtil;
import com.tours.service.UserService;

import io.jsonwebtoken.io.IOException;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	
	private UserService  userService;
	@Autowired
	private AuthenticationManager authManager;
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}
	
	@PostMapping("/authenticate")
	public ResponseEntity<?> authenticate(@RequestBody Credentials cr) {
		// authenticate user with authentication manager		
		Authentication auth = new UsernamePasswordAuthenticationToken(cr.getEmail(), cr.getPassword());
		System.out.println("BEFORE AUTH: " + auth);
		auth = authManager.authenticate(auth);
		System.out.println("AFTER AUTH: " + auth);
		// after authentication, create JWT token and return.
		String token = jwtUtil.createToken(auth);
		return ResponseEntity.ok(token);
	}

	@PostMapping("/register")
	public ResponseEntity<?> registerUser(
	        @RequestPart("user") String userJson,
	        @RequestPart(value = "profilePhoto", required = false) MultipartFile profilePhoto) {
	    try {
	        ObjectMapper objectMapper = new ObjectMapper();
	        User user = objectMapper.readValue(userJson, User.class);
	        System.out.println("user = " +user);

	        // Set default value for mobileNo or leave it null
	        if (user.getMobileNumber() == null || user.getMobileNumber().isEmpty()) {
	            user.setMobileNumber(null); // Or set a default placeholder like "N/A"
	        }

	        String response = userService.registerUser(user, profilePhoto);
	        System.out.println("Response = "+response);
	       
	        String token = jwtUtil.createToken(user.getEmail());
	        System.out.println("token = "+token);
	        return ResponseEntity.ok(new LoginResponse(user.getId(),token, response, true));
	    } catch (Exception e) {
	        return ResponseEntity.status(500).body(new ApiResponse("Error during registration"));
	    }
	}


	
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody Credentials cr) {
		 try {
		        System.out.println("Login attempt: " + cr.getEmail());

		        Authentication auth = authManager.authenticate(
		            new UsernamePasswordAuthenticationToken(cr.getEmail(), cr.getPassword())
		        );

		        System.out.println("Authentication successful for: " + cr.getEmail());
		        System.out.println("Auth principal class: " + auth.getPrincipal().getClass().getName());

		        if (!(auth.getPrincipal() instanceof User)) {
		            throw new RuntimeException("Principal is not an instance of User!");
		        }
		        System.out.println("Auth . get principal"+auth.getPrincipal());
		        User user = (User) auth.getPrincipal(); // Cast to User
		        System.out.println("user = "+user);
		        String token = jwtUtil.createToken(auth);
		        return ResponseEntity.ok(new LoginResponse(user.getId(),token, "Login successful", true));
		    } catch (Exception e) {
		        System.out.println("Authentication failed: " + e.getMessage());
		        return ResponseEntity.status(401).body(new ApiResponse("Invalid credentials"));
		    }
	}
	
	@GetMapping("tour/{id}/photo")
    public ResponseEntity<String> getUserPhoto(@PathVariable Long id) {
        String photoUrl = userService.getUserPhoto(id);
        return ResponseEntity.ok(photoUrl);
    }



}
