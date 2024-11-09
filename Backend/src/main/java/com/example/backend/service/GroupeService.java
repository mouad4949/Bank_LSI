package com.example.backend.service;


import com.example.backend.dto.GroupeDto;
import com.example.backend.model.Employe;
import com.example.backend.model.Groupe;
import com.example.backend.repositories.EmployeRepository;
import com.example.backend.repositories.GroupeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class GroupeService {
    private final GroupeRepository groupeRepository;
    private final EmployeRepository employeRepository;
    public void addGroups(GroupeDto groupeDto) {
        Groupe groupe = Groupe.builder()
                .codeGroupe(groupeDto.getCodeGroupe())
                .nomGroup(groupeDto.getNomGroup())
                .employes(groupeDto.getEmployes())
                .build();
        groupeRepository.save(groupe);
    }
    public void affecterEmployes(Long codeGroupe, List<Long> employeIds) {
        Groupe groupe = groupeRepository.findById(codeGroupe)
                .orElseThrow(() -> new RuntimeException("Groupe introuvable"));
        List<Employe> employes = employeRepository.findAllById(employeIds);
        groupe.getEmployes().addAll(employes);
        groupeRepository.save(groupe);
    }
}
