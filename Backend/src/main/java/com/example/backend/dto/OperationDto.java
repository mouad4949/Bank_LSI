package com.example.backend.dto;

import com.example.backend.model.Compte;
import com.example.backend.model.Employe;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.util.Date;

@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class OperationDto implements Serializable {

    private Long numeroOperacion;
    private Date dateOperation ;
    private double montant ;
    private Compte compte;
    private Employe employe;
}
