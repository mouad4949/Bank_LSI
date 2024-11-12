package com.example.backend.repositories;

import com.example.backend.model.Employe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeRepository extends JpaRepository<Employe,Long> {
    void deleteByCodeEmploye(Long codeEmploye);

    Optional<Employe> findEmployeByEmail(String email);

}