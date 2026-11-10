package com.isetcare.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.*;

@Entity @Getter @Setter @NoArgsConstructor
@Table(name = "recommandations_remplacement")
public class RecommandationRemplacement {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    private Integer nbPannes;
    private Integer nbInterventions;
    @Column(precision = 12, scale = 2) private BigDecimal coutCumuleReparations;
    @Column(precision = 12, scale = 2) private BigDecimal coutRemplacementEstime;
    private Integer dureeIndisponibiliteJours;
    @Enumerated(EnumType.STRING) @Column(nullable = false, length = 20) private Decision decision = Decision.EN_ATTENTE;
    private LocalDate dateAnalyse = LocalDate.now();
    @ManyToOne(optional = false, fetch = FetchType.LAZY) @JoinColumn(name = "equipement_id") private Equipement equipement;
}
