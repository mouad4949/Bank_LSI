package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonSetter;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Collection;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Employe implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codeEmploye;
    private String nomEmploye;

    @ManyToMany
    @JoinTable(name = "EMP_GR")
    private Collection<Groupe> groupes;

    @ManyToOne
    @JoinColumn(name = "code_emp_sup")
    private Employe employeSup;



}
