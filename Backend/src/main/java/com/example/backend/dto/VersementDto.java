package com.example.backend.dto;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("V")
public class VersementDto extends OperationDto {

}

