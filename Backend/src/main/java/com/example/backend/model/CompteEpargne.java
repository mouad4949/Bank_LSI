package com.example.backend.model;


import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

import java.util.Date;

@Entity
@DiscriminatorValue("CE")
public class CompteEpargne extends com.example.backend.model.Compte {
    private  double taux;
    public CompteEpargne() {
        super();
    }

}
