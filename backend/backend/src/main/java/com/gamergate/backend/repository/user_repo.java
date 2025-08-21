package com.gamergate.backend.repository;

import com.gamergate.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface user_repo extends JpaRepository<User,Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    List<User> findByRole(String role);
    List<User> findByIsActiveTrue();

    List<User> findByName(String name);
}
