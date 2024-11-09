package com.example.backend.service;


import com.example.backend.dto.ClientDto;
import com.example.backend.dto.GroupeDto;
import com.example.backend.model.Client;
import com.example.backend.model.Groupe;
import com.example.backend.repositories.ClientRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class ClientService {
    private final ClientRepository clientRepository;
    public void addClients(ClientDto clientDto) {
        Client client = Client.builder()
                .codeClient(clientDto.getCodeClient())
                .nomClient(clientDto.getNomClient())
                .comptes(clientDto.getComptes())
                .build();
        clientRepository.save(client);
    }
}
