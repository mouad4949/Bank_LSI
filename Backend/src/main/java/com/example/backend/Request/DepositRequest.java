package com.example.backend.Request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class DepositRequest {
    private double amount;      // Montant du dépôt
    private Long employeId;     // ID de l'employé qui effectue l'opération
}