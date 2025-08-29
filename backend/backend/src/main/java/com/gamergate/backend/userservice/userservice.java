package com.gamergate.backend.userservice;

import com.gamergate.backend.model.User;
import com.gamergate.backend.repository.user_repo;
import com.gamergate.backend.util.passwordencoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class userservice {

    @Autowired
    private user_repo userRepo;

    @Autowired
    private passwordencoder PasswordEncoder;

    public List<User> getAllUsers(){
        return userRepo.findAll();

    }

    public Optional<User> getUserbyId(Long id){
        return userRepo.findById(id);
    }

    public Optional<User> getUserbyEmail(String email){
        return userRepo.findByEmail(email);
    }

    public User SignUpUser (User user){
        if(userRepo.findByEmail(user.getEmail()).isPresent()){
            throw new RuntimeException("Email already exists!");

        }
        user.setEmail(user.getEmail());
        user.setPassword(PasswordEncoder.encode(user.getPassword()));
        if(user.getName().equals(null)){
            user.setName("Bill");
        }
        if (user.getRole()==null){
            user.setRole("USER");
        }
        if(user.getIsActive()==null){
            user.setIsActive(true);
        }
        return userRepo.save(user);
    }


    public User authUser(String email, String password){
        Optional<User> userOptional = userRepo.findByEmail(email);

        if(userOptional.isEmpty()){
            throw new RuntimeException("Please double check your email");
        }

        User user = userOptional.get();
        if(!PasswordEncoder.compare(password,user.getPassword())){
            throw new RuntimeException("Invalid password");
        }

        if (user.getIsActive().equals(Boolean.FALSE)){
            throw new RuntimeException("The account has been deactivated");
        }
        return user;
    }

    // Update user
    public User updateUser(Long id, User userDetails) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        // Check if email is being changed and if it already exists
        if (!user.getEmail().equals(userDetails.getEmail()) &&
                userRepo.findByEmail(userDetails.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        user.setName(userDetails.getName());
        user.setEmail(userDetails.getEmail());
        user.setPhone(userDetails.getPhone());
        user.setRole(userDetails.getRole());
        user.setIsActive(userDetails.getIsActive());

        return userRepo.save(user);
    }

    // Delete user
    public void deleteUser(Long id) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        userRepo.delete(user);
    }

    // Check if email exists
    public boolean emailExists(String email) {
        return userRepo.findByEmail(email).isPresent();
    }

    // Deactivate user
    public User deactivateUser(Long id) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        user.setIsActive(false);
        return userRepo.save(user);
    }

    // Activate user
    public User activateUser(Long id) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        user.setIsActive(true);
        return userRepo.save(user);
    }

    // Change password
    public User changePassword(Long id, String currentPassword, String newPassword) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        if (!PasswordEncoder.compare(currentPassword, user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        user.setPassword(PasswordEncoder.encode(newPassword));
        return userRepo.save(user);
    }
}
