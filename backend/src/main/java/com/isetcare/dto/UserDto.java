package com.isetcare.dto;

import com.isetcare.model.Role;
import com.isetcare.model.Utilisateur;

/** Représentation publique d'un utilisateur (sans mot de passe). */
public record UserDto(Long id, String nom, String prenom, String email, String telephone, Role role, boolean actif,
                      String departement, String fonction, String service, String specialite, Boolean disponible) {
    public static UserDto from(Utilisateur u) {
        return new UserDto(u.getId(), u.getNom(), u.getPrenom(), u.getEmail(), u.getTelephone(), u.getRole(), u.isActif(),
                u.getDepartement(), u.getFonction(), u.getService(), u.getSpecialite(), u.getDisponible());
    }
}
