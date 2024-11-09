package com.example.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder  // Utilisation de SuperBuilder pour la classe abstraite
@Data
public abstract class Compte implements Serializable {

    @Id
    private String codeCompte;
    private Date dateCreation;
    private Double solde;

    @ManyToOne
    @JoinColumn(name = "CODE_CLI")
    private com.example.backend.model.Client client;

    @ManyToOne
    @JoinColumn(name = "CODE_EMP")
    private Employe employe;

    @OneToMany(mappedBy = "compte")
    private Collection<Operation> operations;
}
