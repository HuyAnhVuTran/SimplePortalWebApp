package com.gamergate.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;


@Entity
@Table(name="users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "phone", nullable = false, unique = true)
    private String phone;

    @Column(name = "role", nullable = false)
    private String role = "USER";

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    public Long getId() {
        return this.id;
    }

    public String getName() {
        return this.name;

    }

    public String getEmail() {
        return this.email;
    }

    public String getRole() {
        return this.role;
    }

    public Boolean getIsActive() {
        return this.isActive;
    }

    public String getPassword(){
        return this.password;
    }
}
