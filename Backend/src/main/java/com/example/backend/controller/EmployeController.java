package com.example.backend.controller;


import com.example.backend.dto.EmployeDto;
import com.example.backend.service.EmployeService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/api/employe")
public class EmployeController {
    private final EmployeService employeService;
    @PostMapping
    public void addEmploye(@RequestBody EmployeDto employeDto)
    {
        employeService.addEmploye(employeDto);
    }
}
