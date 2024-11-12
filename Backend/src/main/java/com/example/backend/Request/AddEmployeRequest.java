package com.example.backend.Request;


import com.example.backend.model.Employe;
import com.example.backend.model.Groupe;
import lombok.*;
import org.springframework.context.annotation.Bean;

import java.util.Collection;

@Setter @Getter @AllArgsConstructor
@NoArgsConstructor

public class AddEmployeRequest {
    private String nomEmploye;
    private String email;
    private String password;
    private Long employeSup;
    private String role;
}