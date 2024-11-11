package com.example.backend.controller;


import com.example.backend.Request.AddEmployeRequest;
import com.example.backend.Request.CreateGroupeRequest;
import com.example.backend.dto.EmployeDto;
import com.example.backend.model.Employe;
import com.example.backend.model.Groupe;
import com.example.backend.service.EmployeService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/employe")
public class EmployeController {
    private final EmployeService employeService;


    @PostMapping
    public ResponseEntity<Employe> createEmploye(@RequestBody AddEmployeRequest addEmployeRequest) {
        try {
            Employe employe = employeService.addEmploye(addEmployeRequest.getNomEmploye(), addEmployeRequest.getEmployeSup());
            return ResponseEntity.ok(employe);
        } catch (Exception e) {
            return ResponseEntity.status(400).body(null);
        }
    }
//
//    @PostMapping
//    public void addEmploye(@RequestBody EmployeDto employeDto)
//    {
//        employeService.addEmploye(employeDto);
//    }
    @GetMapping
    public ResponseEntity<List<Employe>> getAllEmploye() {
        try {
            List<Employe> employes = employeService.getAllEmployees();
            return ResponseEntity.ok(employes);  // Retourne la liste des groupes
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);  // En cas d'erreur, retourne une erreur 500
        }
    }

    @DeleteMapping("/{employeId}")
    public void deleteEmp(@PathVariable Long employeId) {
        employeService.deleteEmploye(employeId);
    }

}
