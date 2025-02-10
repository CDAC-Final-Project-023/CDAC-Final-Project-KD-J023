package com.tours.DTO;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;

@Getter
public class BaseDTO {
	
	@JsonProperty(access = Access.READ_ONLY)
	private Long id;

}
