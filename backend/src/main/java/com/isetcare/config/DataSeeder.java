package com.isetcare.config;

import com.isetcare.model.*;
import com.isetcare.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.time.LocalDate;

/** Données de démonstration (Sprint 3) : insérées uniquement si la base est vide. */
@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seed(UtilisateurRepository users, SalleRepository salles, TypeEquipementRepository types,
                           EquipementRepository equipements, PasswordEncoder encoder) {
        return args -> {
            if (users.count() > 0) return;

            users.save(user("Admin", "ISET", "admin@isetcare.tn", "Admin123!", Role.ADMINISTRATEUR, encoder));
            Utilisateur tech = user("Ben Ali", "Karim", "technicien@isetcare.tn", "Tech1234!", Role.TECHNICIEN, encoder);
            tech.setSpecialite("Informatique");
            users.save(tech);
            Utilisateur ens = user("Trabelsi", "Sonia", "enseignant@isetcare.tn", "Ens12345!", Role.DECLARANT, encoder);
            ens.setDepartement("Informatique");
            ens.setFonction("Enseignante");
            users.save(ens);

            // Fréquences indicatives du document de conception
            TypeEquipement pc = type("PC de laboratoire", 6, 60);
            types.save(pc);
            types.save(type("Imprimante", 3, 48));
            types.save(type("Vidéoprojecteur / Datashow", 6, 72));
            types.save(type("Climatiseur", 4, 120));

            Salle salle = new Salle();
            salle.setNom("Salle INFO-1");
            salle.setBatiment("Bloc A");
            salle.setEtage(1);
            salles.save(salle);

            Equipement e = new Equipement();
            e.setReference("PC-001");
            e.setMarque("HP");
            e.setModele("ProDesk 400");
            e.setNumeroSerie("SN123456");
            e.setDateAcquisition(LocalDate.of(2023, 9, 1));
            e.setPrixAchat(new BigDecimal("1800.00"));
            e.setSalle(salle);
            e.setType(pc);
            equipements.save(e);
        };
    }

    private static Utilisateur user(String nom, String prenom, String email, String pwd, Role role, PasswordEncoder enc) {
        Utilisateur u = new Utilisateur();
        u.setNom(nom);
        u.setPrenom(prenom);
        u.setEmail(email);
        u.setMotDePasse(enc.encode(pwd));
        u.setRole(role);
        return u;
    }

    private static TypeEquipement type(String libelle, int freq, int vie) {
        TypeEquipement t = new TypeEquipement();
        t.setLibelle(libelle);
        t.setFrequenceMaintenanceMois(freq);
        t.setDureeVieEstimeeMois(vie);
        return t;
    }
}
