package com.example.backend.repositories;

import com.example.backend.model.Operation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OperationRepository extends JpaRepository<Operation, Long> {
    void deleteByEmploye_CodeEmploye(Long codeEmploye);
}
