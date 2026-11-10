package com.isetcare.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.*;

@Entity @Getter @Setter @NoArgsConstructor
@Table(name = "maintenances_preventives")
public class MaintenancePreventive {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(nullable = false) private LocalDate datePlanifiee;
    private LocalDate dateRealisation;
    private Integer frequenceMois;
    @Enumerated(EnumType.STRING) @Column(nullable = false, length = 20) private StatutMaintenance statut = StatutMaintenance.PLANIFIEE;
    @Column(columnDefinition = "TEXT") private String rapport;
    @ManyToOne(optional = false, fetch = FetchType.LAZY) @JoinColumn(name = "equipement_id") private Equipement equipement;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "technicien_id") private Utilisateur technicien;
}
