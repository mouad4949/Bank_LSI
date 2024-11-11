package com.example.backend.service;


import com.example.backend.dto.ClientDto;
import com.example.backend.dto.GroupeDto;
import com.example.backend.model.Client;
import com.example.backend.model.Compte;
import com.example.backend.model.Groupe;
import com.example.backend.repositories.ClientRepository;
import com.example.backend.repositories.CompteRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class ClientService {
    private final ClientRepository clientRepository;
    private final CompteRepository compteRepository;

    public void addClients(ClientDto clientDto) {
        Client client = Client.builder()
                .codeClient(clientDto.getCodeClient())
                .nomClient(clientDto.getNomClient())
                .comptes(clientDto.getComptes())
                .build();
        clientRepository.save(client);
    }
    public List<Compte> consulterList(Long clientID){
        Optional<Client> cli= clientRepository.findById(clientID);
        return compteRepository.findAllByClient(cli);
    }

    public List<Client> getAll() {
        return clientRepository.findAll();
    }

    public Client getClient(Long clientId) {
        return clientRepository.findByCodeClient(clientId);
    }

    public void deleteClient(Long clientId) {
        clientRepository.deleteById(clientId);
    }
}
