package com.example.backend.dto;


import com.example.backend.model.Client;
import com.example.backend.model.Employe;
import com.example.backend.model.Operation;
import com.example.backend.model.TypeCompte;
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
public  class CompteDto implements Serializable {

    private Long codeCompte;
    private Date dateCreation;
    private Double solde;
    @Enumerated(EnumType.STRING) // Utilise la valeur textuelle de l'énum
    private TypeCompte type;
    private Double decouvert;
    private Double taux;
//    private Client client;
//    private Employe employe;
//    private Collection<Operation> operations;

}
