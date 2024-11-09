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
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Data
@DiscriminatorValue("CE")
public class CompteEpargne extends com.example.backend.model.Compte {
    private  double taux;


}
