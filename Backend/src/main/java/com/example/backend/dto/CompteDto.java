package com.example.backend.dto;


import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;

@Entity
public abstract class CompteDto implements Serializable {
    @Id
    private String codeCompte;
    private Date dateCreation;
    private Double solde;

    @ManyToOne
    @JoinColumn(name = "CODE_CLI")
    private ClientDto client;

    @ManyToOne
    @JoinColumn(name = "CODE_EMP")
    private EmployeDto employe;

    @OneToMany(mappedBy = "compte")
    private Collection<OperationDto> operations;



}
