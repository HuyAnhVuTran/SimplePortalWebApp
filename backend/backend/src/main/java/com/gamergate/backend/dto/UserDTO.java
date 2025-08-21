package com.gamergate.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserDTO {

    private Long id;

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    private String phone;
    private String role;
    private Boolean isActive;

    public UserDTO(com.gamergate.backend.model.User user){
        this.id=user.getId();
        this.name=user.getName();
        this.email=user.getEmail();
        this.phone=user.getPhone();
        this.role=user.getRole();
        this.isActive=user.getIsActive();
    }
    public UserDTO(){

    }
}
