package com.example.backend.dto;


import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("CE")
public class CompteEpargneDto extends CompteDto {
    private  double taux;


}
