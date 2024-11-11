package com.example.backend.Request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateGroupeRequest {
    private String nomGroup;      // Nom du groupe
    private List<Long> employeIds; // Liste des IDs des employés à ajouter au groupe
}