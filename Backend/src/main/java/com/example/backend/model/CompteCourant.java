package com.example.backend.model;


import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

import java.util.Date;

@Entity
@DiscriminatorValue("CC")
public class CompteCourant extends com.example.backend.model.Compte {

    private double decouvert;


}
