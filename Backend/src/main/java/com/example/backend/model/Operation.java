package com.example.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.util.Date;

@Entity
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Operation implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long numeroOperacion;

    private Date dateOperation;
    private double montant;

    @ManyToOne
    @JoinColumn(name = "CODE_CPTE_DEB")  // Relation avec le compte de l'opération
    private com.example.backend.model.Compte compte;

    @ManyToOne
    @JoinColumn(name = "CODE_CPTE_CRE", nullable = true)  // La colonne peut être nulle par défaut
    private com.example.backend.model.Compte compte_cre;  // Relation avec le compte créateur de l'opération

    @ManyToOne
    @JoinColumn(name = "CODE_EMP")
    private com.example.backend.model.Employe employe;

    @Enumerated(EnumType.STRING)
    private TypeOperation type;
}
