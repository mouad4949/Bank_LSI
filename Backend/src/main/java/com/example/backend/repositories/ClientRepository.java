package com.example.backend.repositories;

import com.example.backend.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {
    Client findByCodeClient(Long codeClient);

    void deleteById(Long clientId);
}
