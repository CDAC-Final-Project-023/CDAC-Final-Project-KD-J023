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
        System.out.println("Authheader" + authHeader);
        //change : Added a check to ensure authHeader is valid before proceeding
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.replace("Bearer ", "").trim();
        System.out.println("token " + token);
        // Validate the token
        Claims claims;
        try {
            claims = jwtUtil.validateToken(token);
            System.out.println("claims" + claims);
            //change : Added a null check after validating the token
            if (claims == null) {
                filterChain.doFilter(request, response);
                return;
            }
        } catch (Exception e) {
            //change : Catching exceptions during token validation to prevent breaking the request flow
            filterChain.doFilter(request, response);
            return;
        }

        // Extract user ID from JWT
        String email = claims.getSubject();
        System.out.println("Subject  using clims.getsubject90 :" + claims.getSubject());
        // Fetch user details from DB
        
        User user = userDao.findByEmail(email);
        //change : Added a check to ensure user is found before proceeding
        if (user == null) {
            filterChain.doFilter(request, response);
            return;
        }

        // Extract photo path from claims and update user entity
        String photoPath = claims.get("photo", String.class);
        if (photoPath != null && !photoPath.isEmpty()) {
            if (user.getPhoto() == null) {
                user.setPhoto(new Photo());
            }
            user.getPhoto().setPhotoPath(photoPath);
            //change : Saving user entity after updating the photo path
            userDao.save(user);
            
        }

        // Set authentication in security context
        Authentication auth = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(auth);

        // Continue with the filter chain
        filterChain.doFilter(request, response);
    }

}
