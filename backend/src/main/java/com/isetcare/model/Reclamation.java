package com.isetcare.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.*;

@Entity @Getter @Setter @NoArgsConstructor
@Table(name = "reclamations")
public class Reclamation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(nullable = false, columnDefinition = "TEXT") private String description;
    private String photo;
    @Column(nullable = false) private LocalDateTime dateCreation = LocalDateTime.now();
    @Enumerated(EnumType.STRING) @Column(nullable = false, length = 20) private StatutReclamation statut = StatutReclamation.NOUVEAU;
    @Enumerated(EnumType.STRING) @Column(nullable = false, length = 20) private Priorite priorite = Priorite.MOYENNE;
    private String categorie;
    @ManyToOne(optional = false, fetch = FetchType.LAZY) @JoinColumn(name = "declarant_id") private Utilisateur declarant;
    @ManyToOne(optional = false, fetch = FetchType.LAZY) @JoinColumn(name = "equipement_id") private Equipement equipement;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "technicien_id") private Utilisateur technicienAffecte;
}
