package com.example.backend.controller;


import com.example.backend.model.Operation;
import com.example.backend.repositories.OperationRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/oper")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class OperationController {
    private final OperationRepository operationRepository;
    @GetMapping
    public List<Operation> getALlOperation(){

        return operationRepository.findAll();
    }


}