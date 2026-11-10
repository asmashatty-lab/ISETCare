package com.isetcare.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.*;

@Entity @Getter @Setter @NoArgsConstructor
@Table(name = "types_equipement")
public class TypeEquipement {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(nullable = false, unique = true, length = 80) private String libelle;
    private Integer frequenceMaintenanceMois = 6;
    private Integer dureeVieEstimeeMois;
}
