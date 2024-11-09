package com.example.backend.dto;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Date;

@Entity
public class OperationDto implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long numeroOperacion;
    private Date dateOperation ;
    private double montant ;

    @ManyToOne
    @JoinColumn(name="CODE_CPTE")
    private CompteDto compte;

    @ManyToOne
    @JoinColumn(name="CODE_EMP")
    private EmployeDto employe;


}
