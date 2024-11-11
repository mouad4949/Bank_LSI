package com.example.backend.Request;
import java.util.List;
public class AffecteEmployeRequest {
    private Long employeId;       // L'ID de l'employé à affecter
    private List<Long> groupesIds; // Liste des IDs des groupes à affecter à l'employé

    // Getters et setters
    public Long getEmployeId() {
        return employeId;
    }

    public void setEmployeId(Long employeId) {
        this.employeId = employeId;
    }

    public List<Long> getGroupesIds() {
        return groupesIds;
    }

    public void setGroupesIds(List<Long> groupesIds) {
        this.groupesIds = groupesIds;
    }
}





