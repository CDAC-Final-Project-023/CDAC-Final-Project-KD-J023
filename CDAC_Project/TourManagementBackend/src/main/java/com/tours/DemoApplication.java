package com.tours;

import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
	
	// configure ModelMapper as a spring bean - so that any other
		// spring bean can use it as a dependency
		@Bean
		public ModelMapper modelMapper() {
			ModelMapper mapper = new ModelMapper(); // creating empty model mapper
			mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT)// prop names n data type must match
																					// between src n dest
					.setPropertyCondition(Conditions.isNotNull());// DO NOT transfer nulls from src ->dest
			return mapper;
		}

}
