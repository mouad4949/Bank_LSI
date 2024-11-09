package com.example.backend.dto;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Collection;

@Entity
public class GroupeDto implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codeGroupe;
    private String nomGroup;

    @ManyToMany(mappedBy = "groupes")
    private Collection<EmployeDto> employes;


}
