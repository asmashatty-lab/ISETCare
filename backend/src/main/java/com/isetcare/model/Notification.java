package com.isetcare.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.*;

@Entity @Getter @Setter @NoArgsConstructor
@Table(name = "notifications")
public class Notification {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Enumerated(EnumType.STRING) @Column(nullable = false, length = 30) private TypeNotification type;
    @Column(nullable = false) private String message;
    @Column(nullable = false) private LocalDateTime dateEnvoi = LocalDateTime.now();
    @Column(nullable = false) private boolean lue = false;
    @ManyToOne(optional = false, fetch = FetchType.LAZY) @JoinColumn(name = "utilisateur_id") private Utilisateur utilisateur;
}
