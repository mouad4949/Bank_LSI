package com.example.backend.controller;


import com.example.backend.dto.CompteDto;
import com.example.backend.model.Compte;
import com.example.backend.service.CompteService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/compte")
public class CompteController {
    private final CompteService compteService;
    public void addCompte(CompteDto compteDto) {
        compteService.addCompte(compteDto);
    }
}
