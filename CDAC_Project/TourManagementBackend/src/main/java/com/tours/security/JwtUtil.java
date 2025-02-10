package com.tours.security;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.tours.dao.UserDao;
import com.tours.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Component
public class JwtUtil {
	@Value(value="${jwt.token.expiration.millis}")
	public long jwtExpiration;
	@Value(value="${jwt.token.secret}")
	public String jwtSecret;
	private Key jwtKey;
	
	@Autowired
	private UserDao userDao;
	@PostConstruct
	public void init() {
		jwtKey = Keys.hmacShaKeyFor(jwtSecret.getBytes());
	}
	
	public String createToken(String email) {
	    Map<String, Object> claims = new HashMap<>();
	    User user = userDao.findByEmail(email);

	    if (user != null) {
	        claims.put("name", user.getFirstName() != null ? user.getFirstName() : "");
	        claims.put("photo", user.getPhoto() != null && user.getPhoto().getPhotoPath() != null 
	                    ? user.getPhoto().getPhotoPath() 
	                    : "/images/default.jpg");
	    }

	    return Jwts.builder()
	            .setClaims(claims)
	            .setSubject(email) // Use email as the subject
	            .setIssuedAt(new Date())
	            .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
	            .signWith(jwtKey, SignatureAlgorithm.HS256)
	            .compact();
	}
	

	public String createToken(Authentication auth) {
	    Object principal = auth.getPrincipal();
	    String email;
	    String name = "";
	    String photo = "";

	    if (principal instanceof UserDetails) {
	        UserDetails userDetails = (UserDetails) principal;
	        email = userDetails.getUsername();  // Get email from UserDetails

	        // 🔹 Fetch the actual User entity from the database using email
	        User user = userDao.findByEmail(email);
	        if (user != null) {
	            name = (user.getFirstName() != null ) 
	                   ? user.getFirstName() 
	                   : "";

	            if (user.getPhoto() != null && user.getPhoto().getPhotoPath() != null) {
	                photo = user.getPhoto().getPhotoPath();
	            } else {
	                photo = "/images/default.jpg"; // Default photo
	            }
	        }
	    } else {
	        throw new IllegalArgumentException("Unknown principal type");
	    }

	    // Add claims
	    Map<String, Object> claims = new HashMap<>();
	    
	    claims.put("name", name);
	    claims.put("photo", photo);
	   

	    return Jwts.builder()
	            .setClaims(claims)
	            .setSubject(email) // Email as the subject of the token
	            .setIssuedAt(new Date())
	            .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
	            .signWith(jwtKey, SignatureAlgorithm.HS256)
	            .compact();
	}


	public Claims validateToken(String token) {
	    try {
	        JwtParser parser = Jwts.parserBuilder().setSigningKey(jwtKey).build();
	        return parser.parseClaimsJws(token).getBody();
	    } catch (Exception e) {
	        throw new RuntimeException("Invalid or expired token", e);
	    }
	}

}
