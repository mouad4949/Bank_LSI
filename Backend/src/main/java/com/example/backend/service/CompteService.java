package com.example.backend.service;

import com.example.backend.dto.CompteDto;
import com.example.backend.model.*;
import com.example.backend.repositories.ClientRepository;
import com.example.backend.repositories.CompteRepository;
import com.example.backend.repositories.EmployeRepository;
import com.example.backend.repositories.OperationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@Service
public class CompteService {
    private final CompteRepository compteRepository;
    private final ClientRepository clientRepository;
    private final EmployeRepository employeRepository;
    private final OperationRepository operationRepository;

    public void CreateCompte(CompteDto compteDto, Long clientId, Long employeId) throws IOException {
        Compte compte1 = new Compte();

        // Affecter les valeurs de base
        compte1.setCodeCompte(compteDto.getCodeCompte());
        compte1.setDateCreation(compteDto.getDateCreation());
        compte1.setSolde(compteDto.getSolde());
        compte1.setType(compteDto.getType());

        // Vérification et affectation de "decouvert" et "taux" s'ils ne sont pas nulls
        if (compteDto.getDecouvert() != null) {
            compte1.setDecouvert(compteDto.getDecouvert());
        }

        if (compteDto.getTaux() != null) {
            compte1.setTaux(compteDto.getTaux());
        }

        // Récupération de l'employé
        Employe employe1 = employeRepository.findById(employeId)
                .orElseThrow(() -> new RuntimeException("Employe not found"));
        compte1.setEmploye(employe1);

        // Récupération du client
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Client not found"));
        compte1.setClient(client);

        // Sauvegarde du compte
        compteRepository.save(compte1);
    }

    public double deposit(Long compteId, double amount, Long employeId) throws IOException {
        // Récupère le compte par son ID
        Compte account = compteRepository.findById(compteId)
                .orElseThrow(() -> new RuntimeException("Compte introuvable avec l'ID : " + compteId));

        // Vérifie si le montant est positif
        if (amount <= 0) {
            throw new RuntimeException("Le montant du dépôt doit être supérieur à zéro.");
        }

        // Ajoute le montant au solde du compte
        account.setSolde(account.getSolde() + amount);

        // Sauvegarde le compte mis à jour
        compteRepository.save(account);

        Employe employe = employeRepository.findById(employeId)
                .orElseThrow(() -> new RuntimeException("Employé introuvable avec l'ID : " + employeId));

        // Crée une nouvelle opération
        Operation operation = Operation.builder()
                .dateOperation(new Date())  // La date actuelle
                .montant(amount)  // Le montant déposé
                .compte(account)
                .type(TypeOperation.VERSEMENT)// Le compte associé à l'opération
                .employe(employe)  // L'employé effectuant l'opération
                .build();

        // Sauvegarde l'opération
        operationRepository.save(operation);

        // Retourne le solde mis à jour
        return account.getSolde();
    }


    public void transfer(Long fromAccountId, Long toAccountId, double amount, Long employeId) {
        // Vérifie si le montant de transfert est valide
        if (amount <= 0) {
            throw new RuntimeException("Le montant du virement doit être supérieur à zéro.");
        }

        // Récupère le compte source (compte débité)
        Compte fromAccount = compteRepository.findById(fromAccountId)
                .orElseThrow(() -> new RuntimeException("Compte source introuvable avec l'ID : " + fromAccountId));

        // Récupère le compte destination (compte crédité)
        Compte toAccount = compteRepository.findById(toAccountId)
                .orElseThrow(() -> new RuntimeException("Compte destination introuvable avec l'ID : " + toAccountId));

        // Vérifie si le compte source a un solde suffisant pour le transfert
        if (fromAccount.getSolde() < amount) {
            throw new RuntimeException("Solde insuffisant dans le compte source pour effectuer ce virement.");
        }

        // Déduit le montant du compte source et ajoute le montant au compte destination
        fromAccount.setSolde(fromAccount.getSolde() - amount);
        toAccount.setSolde(toAccount.getSolde() + amount);

        // Sauvegarde les comptes mis à jour
        compteRepository.save(fromAccount);
        compteRepository.save(toAccount);

        // Récupère l'employé ayant effectué l'opération
        Employe employe = employeRepository.findById(employeId)
                .orElseThrow(() -> new RuntimeException("Employé introuvable avec l'ID : " + employeId));

        // Crée une nouvelle opération
        Operation operation = Operation.builder()
                .dateOperation(new Date())  // La date actuelle
                .montant(amount)  // Le montant transféré
                .type(TypeOperation.VIREMENT)  // Le type d'opération (virement)
                .compte_cre(fromAccount)  // Le compte credité (source)
                .compte(toAccount)  // Le compte débité (destination)
                .employe(employe)  // L'employé effectuant l'opération
                .build();

        // Sauvegarde l'opération
        operationRepository.save(operation);
    }

    public double withdraw(Long CompteId, Long employeId, double amount) throws IOException {

        // Récupère le compte par son ID
        Compte account = compteRepository.findById(CompteId)
                .orElseThrow(() -> new RuntimeException("Compte introuvable avec l'ID : " + CompteId));

        // Vérifie si le montant est positif
        if (amount < 0) {
            throw new RuntimeException("Votre Solde est insuffisant");
        }

        // Ajoute le montant au solde du compte
        account.setSolde(account.getSolde() - amount);

        // Sauvegarde le compte mis à jour
        compteRepository.save(account);

        Employe employe = employeRepository.findById(employeId)
                .orElseThrow(() -> new RuntimeException("Employé introuvable avec l'ID : " + employeId));

        // Crée une nouvelle opération
        Operation operation = Operation.builder()
                .dateOperation(new Date())  // La date actuelle
                .montant(amount)  // Le montant déposé
                .compte_cre(account)
                .type(TypeOperation.RETRAIT)// Le compte associé à l'opération
                .employe(employe)  // L'employé effectuant l'opération
                .build();

        // Sauvegarde l'opération
        operationRepository.save(operation);

        // Retourne le solde mis à jour
        return account.getSolde();
    }


    public void deleteCompte(Long compteId) {
        compteRepository.deleteById(compteId);
    }

    public List<Compte> getAllCompte() {
        return compteRepository.findAll();
    }
}

