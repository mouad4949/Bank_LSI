package com.example.backend.model;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Date;

@Entity
public class Operation implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long numeroOperacion;
    private Date dateOperation ;
    private double montant ;

    @ManyToOne
    @JoinColumn(name="CODE_CPTE")
    private com.example.backend.model.Compte compte;

    @ManyToOne
    @JoinColumn(name="CODE_EMP")
    private com.example.backend.model.Employe employe;


}
