package com.isetcare.dto;

import com.isetcare.model.Role;
import jakarta.validation.constraints.*;

/** Création / modification d'un compte par l'administrateur (US02). */
public record UserRequest(
        @NotBlank String nom,
        @NotBlank String prenom,
        @NotBlank @Email String email,
        @Size(min = 8, message = "Mot de passe : 8 caractères minimum") String motDePasse,
        String telephone,
        @NotNull Role role,
        String departement, String fonction, String service, String specialite, Boolean disponible) {
}
