package com.isetcare.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.*;

@Entity @Getter @Setter @NoArgsConstructor
@Table(name = "utilisateurs")
public class Utilisateur {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 60) private String nom;
    @Column(nullable = false, length = 60) private String prenom;
    @Column(nullable = false, unique = true, length = 120) private String email;
    @Column(name = "mot_de_passe", nullable = false) private String motDePasse;
    @Column(length = 20) private String telephone;
    @Enumerated(EnumType.STRING) @Column(nullable = false, length = 20) private Role role;
    @Column(nullable = false) private boolean actif = true;

    // Champs propres aux sous-classes (héritage "table unique")
    private String departement;   // Déclarant
    private String fonction;      // Déclarant
    private String service;       // Administrateur
    private String specialite;    // Technicien
    private Boolean disponible = true; // Technicien
}
