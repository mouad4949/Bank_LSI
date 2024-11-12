package com.example.backend.controller;


import com.example.backend.Request.AffecteEmployeRequest;
import com.example.backend.Request.CreateGroupeRequest;
import com.example.backend.dto.GroupeDto;
import com.example.backend.model.Employe;
import com.example.backend.model.Groupe;
import com.example.backend.service.GroupeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/Groupe")

public class GroupeController {
    private final GroupeService groupeService;

    @PostMapping
    public ResponseEntity<Groupe> createGroupe(@RequestBody CreateGroupeRequest createGroupeRequest) {
        try {
            // Appel au service pour créer un groupe avec les employés
            Groupe groupe = groupeService.createGroupe(createGroupeRequest.getNomGroup(), createGroupeRequest.getEmployeIds());
            return ResponseEntity.ok(groupe);  // Retourne le groupe créé
        } catch (Exception e) {
            return ResponseEntity.status(400).body(null);  // En cas d'erreur, retourne une réponse avec status 400
        }
    }

    @GetMapping
    public ResponseEntity<List<Groupe>> getAllGroupes() {
        try {
            List<Groupe> groupes = groupeService.getAllGroupes();
            return ResponseEntity.ok(groupes);  // Retourne la liste des groupes
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);  // En cas d'erreur, retourne une erreur 500
        }
    }
    @PostMapping("/assign-groups")
    public ResponseEntity<String> assignGroupsToEmployee(@RequestBody AffecteEmployeRequest dto) {
        try {
            groupeService.assignGroupsToEmployee(dto.getEmployeId(), dto.getGroupesIds());
            return ResponseEntity.ok("Les groupes ont été affectés à l'employé avec succès.");
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Erreur : " + e.getMessage());
        }
    }

    @GetMapping("/{groupId}")
    public ResponseEntity<List<Employe>> getEmployesByGroup(@PathVariable Long groupId) {
        try {
            List<Employe> employes = groupeService.getEmployesByGroupId(groupId);
            return ResponseEntity.ok(employes);
        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erreur : " + e.getMessage());
            return ResponseEntity.status(500).body(null);
        }
    }

    @DeleteMapping("/{groupId}")
    public ResponseEntity<?> deleteGroup(@PathVariable Long groupId) {
        try {
            groupeService.deleteGroup(groupId);
            return ResponseEntity.ok(new HashMap<String, String>() {{
                put("message", "Groupe supprimé avec succès");
            }});
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new HashMap<String, String>() {{
                        put("error", e.getMessage());
                    }});
        }
    }

    @GetMapping("/consult/{groupId}")
    public ResponseEntity<?> getGroupById(@PathVariable Long groupId) {
        try {
            Groupe groupe = groupeService.getGroup(groupId);
            if (groupe != null) {
                return ResponseEntity.ok(groupe);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new HashMap<String, String>() {{
                            put("error", "Groupe introuvable avec l'ID : " + groupId);
                        }});
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new HashMap<String, String>() {{
                        put("error", e.getMessage());
                    }});
        }
    }

//    @PostMapping("/{codeGroupe}/affecter-employes")
//    public ResponseEntity<String> affecterEmployes(
//            @PathVariable Long codeGroupe,
//            @RequestBody List<Long> employeIds) {
//        groupeService.affecterEmployes(codeGroupe, employeIds);
//        return ResponseEntity.ok("Employés affectés avec succès au groupe");
//    }

}
