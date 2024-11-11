package com.example.backend.repositories;

import com.example.backend.model.Client;
import com.example.backend.model.Compte;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CompteRepository extends JpaRepository<Compte, Long> {
    List<Compte> findAllByClient(Optional<Client> cli);
}
