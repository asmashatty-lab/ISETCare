package com.isetcare.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.*;

@Entity @Getter @Setter @NoArgsConstructor
@Table(name = "analyses_ia")
public class AnalyseIA {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    private String categorieSuggeree;
    @Enumerated(EnumType.STRING) @Column(length = 20) private Priorite prioriteSuggeree;
    private String typePanneProbable;
    private Float scoreConfiance;
    @OneToOne(optional = false, fetch = FetchType.LAZY) @JoinColumn(name = "reclamation_id", unique = true) private Reclamation reclamation;
}
