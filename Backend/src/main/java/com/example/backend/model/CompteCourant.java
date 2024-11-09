package com.example.backend.model;


import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@SuperBuilder
@DiscriminatorValue("CC")
public class CompteCourant extends Compte {

    private double decouvert;


}
