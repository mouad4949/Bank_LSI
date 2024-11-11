package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
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
@SuperBuilder
@Data
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "codeCompte")
public class Compte implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codeCompte;
    private Date dateCreation;
    private Double solde;

    @Enumerated(EnumType.STRING)
    private TypeCompte type;
    @Column(nullable = true)
    private Double decouvert;

    @Column(nullable = true)
    private Double taux;

    @ManyToOne
    @JoinColumn(name = "CODE_CLI")
    private Client client;
    @ManyToOne
    @JoinColumn(name = "CODE_EMP")
    private Employe employe;

    @OneToMany(mappedBy = "compte")
    private Collection<Operation> operations;
}
