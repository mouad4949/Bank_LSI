package com.example.backend.model;

import java.io.Serializable;
import java.util.Collection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Client implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codeClient ;
    private String nomClient ;

    @OneToMany(mappedBy="client" , fetch = FetchType.LAZY)
    private Collection<com.example.backend.model.Compte> comptes;



}
