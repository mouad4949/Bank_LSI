package com.example.backend.service;

import com.example.backend.dto.CompteDto;
import com.example.backend.model.Compte;
import com.example.backend.model.CompteCourant;  // Importer la sous-classe concrète
import com.example.backend.repositories.CompteRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class CompteService {
    private final CompteRepository compteRepository;

    public void addCompte(CompteDto compteDto) {
        // Créer un objet de type CompteCourant (ou une autre sous-classe concrète de Compte)
        Compte compte = CompteCourant.builder()  // Utilisez ici la classe concrète (CompteCourant)
                .codeCompte(compteDto.getCodeCompte())
                .dateCreation(compteDto.getDateCreation())
                .solde(compteDto.getSolde())
                .client(compteDto.getClient())
                .employe(compteDto.getEmploye())
                .operations(compteDto.getOperations())
                .decouvert(0.0)  // Initialisez les attributs spécifiques à CompteCourant
                .build();
        compteRepository.save(compte);
    }
}
