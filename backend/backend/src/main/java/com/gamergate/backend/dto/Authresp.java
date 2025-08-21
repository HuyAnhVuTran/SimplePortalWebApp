package com.gamergate.backend.dto;

import com.gamergate.backend.model.User;
import lombok.Data;

public class Authresp {
    private String token;
    private String type="Bearer";
    private UserDTO user;

    public Authresp(String token, UserDTO user){
        this.token=token;
        this.user=user;
    }
}
