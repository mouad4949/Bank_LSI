package com.example.backend.dto;


import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("CC")
public class CompteCourantDto extends CompteDto {

    private double decouvert;


}
