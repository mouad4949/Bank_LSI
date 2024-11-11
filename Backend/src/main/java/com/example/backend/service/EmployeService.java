package com.example.backend.service;


import com.example.backend.dto.EmployeDto;
import com.example.backend.dto.GroupeDto;
import com.example.backend.model.Employe;
import com.example.backend.model.Groupe;
import com.example.backend.repositories.EmployeRepository;
import com.example.backend.repositories.GroupeRepository;
import com.example.backend.repositories.OperationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class EmployeService {
    private final EmployeRepository employeRepository;
    private final OperationRepository operationRepository;
    public void addEmploye(EmployeDto employeDto) {
        Employe employe = Employe.builder()
                .codeEmploye(employeDto.getCodeEmploye())
                .nomEmploye(employeDto.getNomEmploye())
                .groupes(employeDto.getGroupes())
                .employeSup(employeDto.getEmployeSup())
                .build();
        employeRepository.save(employe);
    }

    public List<Employe> getAllEmployees() {
        return employeRepository.findAll();
    }

    @Transactional
    public void deleteEmploye(Long codeEmploye) {
        // Étape 1: Supprimer les références dans la table `operation`
        operationRepository.deleteByEmploye_CodeEmploye(codeEmploye);

        // Étape 2: Supprimer l'employé
        employeRepository.deleteByCodeEmploye(codeEmploye);
    }

    @Transactional
    public Employe addEmploye(String nomEmploye, Employe employeSup) {
        Employe employe=Employe.builder().nomEmploye(nomEmploye).employeSup(employeSup).build();
        employe=employeRepository.save(employe);
        return employe;
    }



}
