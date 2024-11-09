package com.example.backend.controller;


import com.example.backend.dto.ClientDto;
import com.example.backend.model.Client;
import com.example.backend.service.ClientService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/api/client")
public class ClientController {
    private final ClientService clientService;
    @PostMapping
    public void addClient(@RequestBody ClientDto clientdto) {
        clientService.addClients(clientdto);
    }
}
