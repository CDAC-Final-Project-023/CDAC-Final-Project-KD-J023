package com.tours.DTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUpdateDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String mobile;
    private String newPassword;
}

