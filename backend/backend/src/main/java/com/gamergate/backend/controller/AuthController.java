package com.gamergate.backend.controller;

import com.gamergate.backend.dto.Authresp;
import com.gamergate.backend.dto.Loginreq;
import com.gamergate.backend.dto.UserDTO;
import com.gamergate.backend.model.User;
import com.gamergate.backend.userservice.UserService;
import com.gamergate.backend.util.JWTutil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JWTutil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<Authresp> register(@Valid @RequestBody User user) {
        User registeredUser = userService.SignUpUser(user);
        String token = jwtUtil.generateToken(registeredUser.getEmail());
        return ResponseEntity.ok(new Authresp(token, new UserDTO(registeredUser)));
    }

    @PostMapping("/login")
    public ResponseEntity<Authresp> login(@Valid @RequestBody Loginreq loginRequest) {
        User user = userService.authUser(loginRequest.getEmail(), loginRequest.getPassword());
        String token = jwtUtil.generateToken(user.getEmail());
        return ResponseEntity.ok(new Authresp(token, new UserDTO(user)));
    }
}