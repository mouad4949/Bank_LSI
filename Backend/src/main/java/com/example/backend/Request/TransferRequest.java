package com.example.backend.Request;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransferRequest {
    private double amount;
    private Long employeId; // Montant à transférer
}

