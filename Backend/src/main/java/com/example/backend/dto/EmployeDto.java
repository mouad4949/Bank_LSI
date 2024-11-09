package com.example.backend.dto;

import com.example.backend.model.Employe;
import com.example.backend.model.Groupe;
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
public class EmployeDto implements Serializable {

    private Long codeEmploye;
    private String nomEmploye;


    private Collection<Groupe> groupes;


    private Employe employeSup;



}
