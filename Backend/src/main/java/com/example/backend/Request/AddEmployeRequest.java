package com.example.backend.Request;


import com.example.backend.model.Employe;
import com.example.backend.model.Groupe;
import lombok.*;
import org.springframework.context.annotation.Bean;

import java.util.Collection;

@Setter @Getter @AllArgsConstructor
@NoArgsConstructor

public class AddEmployeRequest {
    private Long codeEmploye;
    private String nomEmploye;
    private Employe employeSup;
    private Collection<Groupe> groupes;
}
