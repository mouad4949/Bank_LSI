package com.example.backend.dto;


import com.example.backend.model.Client;
import com.example.backend.model.Employe;
import com.example.backend.model.Operation;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;

@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Data
public abstract class CompteDto implements Serializable {

    private String codeCompte;
    private Date dateCreation;
    private Double solde;



    private Client client;

    private Employe employe;

    private Collection<Operation> operations;



}
