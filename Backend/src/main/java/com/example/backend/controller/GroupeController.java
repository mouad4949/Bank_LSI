package com.example.backend.controller;


import com.example.backend.dto.GroupeDto;
import com.example.backend.service.GroupeService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/Groupe")

public class GroupeController {
    private final GroupeService groupeService;

    @PostMapping
    public void createModule(@RequestBody GroupeDto groupeDto) //Request body== l'objet d'entrée doit etre converti vers un objet java
    {
        groupeService.addGroups(groupeDto);
    }
    @PostMapping("/{codeGroupe}/affecter-employes")
    public ResponseEntity<String> affecterEmployes(
            @PathVariable Long codeGroupe,
            @RequestBody List<Long> employeIds) {
        groupeService.affecterEmployes(codeGroupe, employeIds);
        return ResponseEntity.ok("Employés affectés avec succès au groupe");
    }

}
