package com.example.backend.repositories;

import com.example.backend.model.Employe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeRepository extends JpaRepository<Employe,Long> {
}
