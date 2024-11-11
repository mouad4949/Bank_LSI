package com.example.backend.dto;

import com.example.backend.model.Employe;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Collection;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class GroupeDto implements Serializable {

    private Long codeGroupe;
    private String nomGroup;

    private Collection<Long> employes;

}
