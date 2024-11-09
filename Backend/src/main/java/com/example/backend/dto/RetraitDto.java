package com.example.backend.dto;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("R")
public class RetraitDto extends OperationDto {

}
