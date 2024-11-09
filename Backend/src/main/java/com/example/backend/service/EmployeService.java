package com.example.backend.service;


import com.example.backend.dto.EmployeDto;
import com.example.backend.dto.GroupeDto;
import com.example.backend.model.Employe;
import com.example.backend.model.Groupe;
import com.example.backend.repositories.EmployeRepository;
import com.example.backend.repositories.GroupeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmployeService {
    private final EmployeRepository employeRepository;
    public void addEmploye(EmployeDto employeDto) {
        Employe employe = Employe.builder()
                .codeEmploye(employeDto.getCodeEmploye())
                .nomEmploye(employeDto.getNomEmploye())
                .groupes(employeDto.getGroupes())
                .employeSup(employeDto.getEmployeSup())
                .build();
        employeRepository.save(employe);
    }
}
