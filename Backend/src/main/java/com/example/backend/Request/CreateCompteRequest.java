package com.example.backend.Request;

import com.example.backend.dto.CompteDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Setter @Getter @AllArgsConstructor @NoArgsConstructor
public class CreateCompteRequest {
    private CompteDto compte;
    private Long clientId;
    private Long employeId;

    // Getters et setters
}