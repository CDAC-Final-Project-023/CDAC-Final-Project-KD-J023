package com.tours.exceptions;

public class ResourceNotFoundException extends RuntimeException {
	public ResourceNotFoundException(String mesg) {
		super(mesg);
	}
}

