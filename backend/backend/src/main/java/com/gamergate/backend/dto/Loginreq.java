package com.gamergate.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class Loginreq {
    @NotBlank(message = "Email must not be left blank")
    private String email;

    @NotBlank(message = "Password must not be left blank")
    private String password;


}
