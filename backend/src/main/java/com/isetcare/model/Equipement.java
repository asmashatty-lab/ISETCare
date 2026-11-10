package com.isetcare.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.*;

@Entity @Getter @Setter @NoArgsConstructor
@Table(name = "equipements")
public class Equipement {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(nullable = false, unique = true, length = 60) private String reference;
    private String marque;
    private String modele;
    private String numeroSerie;
    private LocalDate dateAcquisition;
    @Column(precision = 12, scale = 2) private BigDecimal prixAchat;
    @Enumerated(EnumType.STRING) @Column(nullable = false, length = 20) private EtatEquipement etat = EtatEquipement.EN_SERVICE;
    private String qrCode;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "salle_id") private Salle salle;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "type_equipement_id") private TypeEquipement type;
}
