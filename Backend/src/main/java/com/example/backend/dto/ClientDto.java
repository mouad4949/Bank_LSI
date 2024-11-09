package com.example.backend.dto;

import com.example.backend.model.Compte;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Collection;
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data

public class ClientDto implements Serializable {

    private Long codeClient ;
    private String nomClient ;


    private Collection<Compte> comptes;
}
