package com.example.backend.model;

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
public class Groupe implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codeGroupe;
    private String nomGroup;

    @ManyToMany(mappedBy = "groupes")
    private Collection<com.example.backend.model.Employe> employes;


}
