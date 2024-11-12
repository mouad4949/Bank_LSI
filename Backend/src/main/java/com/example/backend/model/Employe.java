package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Employe implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codeEmploye;
    private String nomEmploye;
    private String email;
    private String password;
    private String role;
    @ManyToMany
    @JoinTable(name = "EMP_GR")
    @JsonIgnore // Éviter la référence circulaire lors de la sérialisation
    private Collection<Groupe> groupes;

    @ManyToOne
    @JoinColumn(name = "code_emp_sup")
    @JsonIgnore // Éviter la référence circulaire
    private Employe employeSup;
}