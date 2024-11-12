package com.example.backend.controller;


import com.example.backend.Request.CreateCompteRequest;
import com.example.backend.Request.DepositRequest;
import com.example.backend.Request.TransferRequest;
import com.example.backend.dto.CompteDto;
import com.example.backend.model.Compte;
import com.example.backend.service.CompteService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/compte")
public class CompteController {
    private final CompteService compteService;

    public CompteController(CompteService compteService) {
        this.compteService = compteService;
    }

    @PostMapping
    public String createCompte(@RequestBody CreateCompteRequest creatObj) throws IOException {
        compteService.CreateCompte(creatObj.getCompte(), creatObj.getClientId(), creatObj.getEmployeId());
        return "Your compte is created";
    }
    // Méthode pour le dépôt sur un compte
    @PutMapping("/{compteId}/deposit")
    public ResponseEntity<String> deposit(
            @PathVariable Long compteId,
            @RequestBody DepositRequest depositRequest) {
        try {
            // Appel à la méthode de service pour effectuer le dépôt
            double newBalance = compteService.deposit(compteId, depositRequest.getAmount(), depositRequest.getEmployeId());
            return ResponseEntity.ok("Dépôt effectué avec succès. Nouveau solde : " + newBalance);
        } catch (RuntimeException e) {
            // Si un problème survient, on retourne un BAD_REQUEST
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erreur : " + e.getMessage());
        } catch (Exception e) {
            // Autres erreurs inattendues
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur inattendue : " + e.getMessage());
        }
    }

    @PutMapping("/{compteId}/withdraw")
    public ResponseEntity<String> withdraw(
            @PathVariable Long compteId,
            @RequestBody DepositRequest depositRequest) {

        try {
            // Appel à la méthode de service pour effectuer le retrait (withdraw)
            double newBalance = compteService.withdraw(compteId, depositRequest.getEmployeId(), depositRequest.getAmount());
            return ResponseEntity.ok("Retrait effectué avec succès. Nouveau solde : " + newBalance);
        } catch (RuntimeException e) {
            // Si un problème survient, on retourne un BAD_REQUEST
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erreur : " + e.getMessage());
        } catch (Exception e) {
            // Autres erreurs inattendues
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur inattendue : " + e.getMessage());
        }
    }



    @PutMapping("/{fromAccountId}/transfer/{toAccountId}")
    public ResponseEntity<String> transfer(
            @PathVariable Long fromAccountId,
            @PathVariable Long toAccountId,
            @RequestBody TransferRequest transferRequest) {

        try {
            // Appel à la méthode de service pour effectuer le virement
            compteService.transfer(fromAccountId, toAccountId, transferRequest.getAmount(), transferRequest.getEmployeId());
            return ResponseEntity.ok("Virement effectué avec succès.");
        } catch (RuntimeException e) {
            // Si un problème survient, on retourne un BAD_REQUEST
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erreur : " + e.getMessage());
        } catch (Exception e) {
            // Autres erreurs inattendues
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur inattendue : " + e.getMessage());
        }
    }

    @DeleteMapping("/{compteId}")
    public void deleteCompte(@PathVariable Long compteId) {
        compteService.deleteCompte(compteId);
    }

    @GetMapping()
    public List<Compte> getAllCompte()
    {
        return compteService.getAllCompte();
    }

}
