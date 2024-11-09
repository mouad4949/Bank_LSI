package com.example.backend.dto;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;


@AllArgsConstructor
@Data
@SuperBuilder
@DiscriminatorValue("R")
public class RetraitDto extends OperationDto {

}
