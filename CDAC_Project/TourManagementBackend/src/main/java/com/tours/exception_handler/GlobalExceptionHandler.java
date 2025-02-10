package com.tours.exception_handler;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.tours.custom_exceptions.AuthenticationException;
import com.tours.custom_exceptions.ResourceNotFoundException;
import com.tours.entity.ApiResponse;
import com.tours.DTO.*;

@RestControllerAdvice
public class GlobalExceptionHandler {
	// exception handling method
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<?> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
		System.out.println("in handle method arg invalid exc ");
		List<FieldError> errors = e.getFieldErrors();
		Map<String, String> errorMap = errors.stream() // Stream<FieldError>
				.collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage));// Map : key - field
																								// name , val- err mesg

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMap);
	}

	
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException e) {
		System.out.println("in handle res not found exc ");
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
	}

	// exception handling method
	@ExceptionHandler(AuthenticationException.class)
	public ResponseEntity<?> handleAuthenticationException(AuthenticationException e) {
		System.out.println("in handle auth exc ");
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse(e.getMessage()));
	}

	// exception handling method - catch all
	@ExceptionHandler(Exception.class)
	public ResponseEntity<?> handleException(Exception e) {
		System.out.println("in catch all " + e);
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
	}

}
