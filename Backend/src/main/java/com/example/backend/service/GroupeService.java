package com.example.backend.service;


import com.example.backend.dto.GroupeDto;
import com.example.backend.model.Client;
import com.example.backend.model.Employe;
import com.example.backend.model.Groupe;
import com.example.backend.repositories.EmployeRepository;
import com.example.backend.repositories.GroupeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class GroupeService {
    private final GroupeRepository groupeRepository;
    private final EmployeRepository employeRepository;

    @Transactional
    public Groupe createGroupe(String nomGroup, List<Long> employeIds) {
        // Création du groupe
        Groupe groupe = Groupe.builder()
                .nomGroup(nomGroup)
                .build();

        // Sauvegarder le groupe dans la base de données
        groupe = groupeRepository.save(groupe);

        // Ajouter les employés au groupe (si des employés sont fournis)
        if (employeIds != null && !employeIds.isEmpty()) {
            for (Long employeId : employeIds) {
                Employe employe = employeRepository.findById(employeId)
                        .orElseThrow(() -> new RuntimeException("Employé introuvable avec l'ID : " + employeId));
                employe.getGroupes().add(groupe);
                employeRepository.save(employe);
            }
        }

        return groupe;
    }

    public List<Groupe> getAllGroupes() {
        return groupeRepository.findAll();
    }

    public void assignGroupsToEmployee(Long employeId, List<Long> groupesIds) {
        // Récupérer l'employé par son ID
        Employe employe = employeRepository.findById(employeId)
                .orElseThrow(() -> new RuntimeException("Employé introuvable avec l'ID : " + employeId));

        // Récupérer les groupes par leurs IDs
        List<Groupe> groupes = groupeRepository.findAllByCodeGroupeIn(groupesIds);

        // Ajouter les groupes à l'employé
        employe.getGroupes().addAll(groupes);

        // Sauvegarder l'employé mis à jour
        employeRepository.save(employe);
    }

    public List<Employe> getEmployesByGroupId(Long groupId) {
        Groupe groupe = groupeRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Groupe introuvable avec l'ID : " + groupId));

        return new ArrayList<>(groupe.getEmployes());
    }

    public void deleteGroup(Long groupId) {
        Groupe groupe = groupeRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Groupe introuvable avec l'ID : " + groupId));

        // Remove the associations with employees first
        groupe.getEmployes().clear();

        // Delete the group
        groupeRepository.delete(groupe);
    }

    public Groupe getGroup(Long groupId) {
        return groupeRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Groupe introuvable avec l'ID : " + groupId));
    }

//    public void affecterEmployes(Long codeGroupe, List<Long> employeIds) {
//        Groupe groupe = groupeRepository.findById(codeGroupe)
//                .orElseThrow(() -> new RuntimeException("Groupe introuvable"));
//        List<Employe> employes = employeRepository.findAllById(employeIds);
//        groupe.getEmployes().addAll(employes);
//        groupeRepository.save(groupe);
//    }
}
