package com.tours.security;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import com.tours.dao.UserDao;
import com.tours.entity.Photo;
import com.tours.entity.User;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {
	@Autowired
	private JwtUtil jwtUtil;
	@Autowired
	private UserDao userDao;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// PRE-PROCESSING
		// get jwt token from request header
		String authHeader = request.getHeader("Authorization");
		boolean validHeader = authHeader != null && authHeader.startsWith("Bearer");
		Authentication auth = null;
		if (validHeader) {
		    String token = authHeader.replace("Bearer", "").trim();
		    // Validate the JWT token and extract claims
		    Claims claims = jwtUtil.validateToken(token);
		    String subject = claims.getSubject();

		    // Extract additional claims
		    String photoPath = claims.get("photo", String.class); // Extract photo path from claims

		    // Verify user details
		    long userId = Long.parseLong(subject);
		    User user = userDao.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

		    // Update the photo if necessary
		    if (photoPath != null && !photoPath.isEmpty()) {
		        if (user.getPhoto() == null) {
		            // Create a new Photo object
		            Photo photo = new Photo();
		            photo.setPhotoPath(photoPath);
		            user.setPhoto(photo);
		        } else {
		            // Update the existing Photo object
		            user.getPhoto().setPhotoPath(photoPath);
		        }
		    }

		    // Create an authentication object
		    auth = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
		}

	    // Attach authentication to the SecurityContext
	    if (auth != null && SecurityContextHolder.getContext().getAuthentication() == null) {
	        SecurityContextHolder.getContext().setAuthentication(auth);
	    }

    // Invoke the next filter in the chain
	    filterChain.doFilter(request, response);
	}

   
}
