package com.example.backend.controller;


import com.example.backend.dto.ClientDto;
import com.example.backend.model.Client;
import com.example.backend.model.Compte;
import com.example.backend.service.ClientService;
import com.example.backend.service.CompteService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/client")
public class ClientController {
    private final ClientService clientService;
    private final CompteService compteService;

    @PostMapping
    public void addClient(@RequestBody ClientDto clientdto) {
        clientService.addClients(clientdto);
    }

    @GetMapping
    public List<Client>getAllClients() {
        return clientService.getAll();
    }
    @GetMapping("ConsulterClient/{clientId}")
    public Client getClientById(@PathVariable Long clientId) {
        return clientService.getClient(clientId);
    }
    @DeleteMapping("/{clientId}")
    public void deleteClient(@PathVariable Long clientId) {
        clientService.deleteClient(clientId);
    }
    @GetMapping("ConsulterComptes/{clientId}")
    public List<Compte> consulterComptes(@PathVariable Long clientId) {
        return clientService.consulterList(clientId);
    }
}
