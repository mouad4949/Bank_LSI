package com.example.backend.repositories;

import com.example.backend.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface ClientRepository extends JpaRepository<Client, Long> {
    Client findByCodeClient(Long codeClient);

    void deleteById(Long clientId);

    Optional<Client> findClientByEmail(String email);
}