package com.example.backend.repositories;

import com.example.backend.model.Groupe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GroupeRepository extends JpaRepository<Groupe, Long> {

    List<Groupe> findAllByCodeGroupeIn(List<Long> codeGroupes);

    void deleteById(Long groupId);

    Groupe findByCodeGroupe(Long codeGroupe);

}
