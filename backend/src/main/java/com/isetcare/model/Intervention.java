package com.isetcare.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.*;

@Entity @Getter @Setter @NoArgsConstructor
@Table(name = "interventions")
public class Intervention {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(columnDefinition = "TEXT") private String diagnostic;
    @Column(columnDefinition = "TEXT") private String actionEffectuee;
    private LocalDateTime dateDebut;
    private LocalDateTime dateFin;
    @Column(precision = 12, scale = 2) private BigDecimal cout;
    private String resultat;
    @ManyToOne(optional = false, fetch = FetchType.LAZY) @JoinColumn(name = "reclamation_id") private Reclamation reclamation;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "technicien_id") private Utilisateur technicien;
}
