package com.example.backend.controller;
import com.example.backend.model.Client;
import com.example.backend.repositories.ClientRepository;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.backend.model.Client;
import com.example.backend.model.Employe;
import com.example.backend.repositories.ClientRepository;
import com.example.backend.repositories.EmployeRepository;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")

public class LoginController {
    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private EmployeRepository employeRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody ObjectNode json) {
        String email = json.get("email").asText();
        String password = json.get("password").asText();

        // Chercher l'utilisateur dans les clients
        Optional<Client> client = clientRepository.findClientByEmail(email);
        if (client.isPresent() && client.get().getPassword().equals(password)) {
            return ResponseEntity.ok().body(
                    Map.of(
                            "message", "Login réussi",
                            "role", "CLIENT",
                            "code", client.get().getCodeClient()
                    )
            );
        }

        // Chercher l'utilisateur dans les employés
        Optional<Employe> employe = employeRepository.findEmployeByEmail(email);
        if (employe.isPresent() && employe.get().getPassword().equals(password)) {
            String role = employe.get().getRole() != null ? "EMP_SUP" : "EMPLOYE";
            return ResponseEntity.ok().body(
                    Map.of(
                            "message", "Login réussi",
                            "role", role,
                            "code", employe.get().getCodeEmploye()
                    )
            );
        }
        // Si l'utilisateur n'est pas trouvé
        return ResponseEntity.status(401).body("Email ou mot de passe incorrect");
    }
}