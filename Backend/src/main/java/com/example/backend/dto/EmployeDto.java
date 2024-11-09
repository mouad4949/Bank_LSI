package com.example.backend.dto;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Collection;

@Entity
public class EmployeDto implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codeEmploye;
    private String nomEmploye;

    @ManyToMany
    @JoinTable(name = "EMP_GR")
    private Collection<GroupeDto> groupes;

    @ManyToOne
    @JoinColumn(name = "code_emp_sup")
    private EmployeDto employeSup;



}
