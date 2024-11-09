package com.example.backend.dto;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Collection;


public class ClientDto implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codeClient ;
    private String nomClient ;

    @OneToMany(mappedBy="client" , fetch = FetchType.LAZY)
    private Collection<CompteDto> comptes;
}
