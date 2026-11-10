package com.isetcare.security;

import com.isetcare.model.Utilisateur;
import com.isetcare.repository.UtilisateurRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

/** Lit le token "Authorization: Bearer ..." et authentifie l'utilisateur (US37 : contrôle par rôle). */
@Component
public class JwtAuthFilter extends OncePerRequestFilter {
    private final JwtService jwt;
    private final UtilisateurRepository users;

    public JwtAuthFilter(JwtService jwt, UtilisateurRepository users) {
        this.jwt = jwt;
        this.users = users;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
            throws ServletException, IOException {
        String header = req.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            try {
                String email = jwt.extractEmail(header.substring(7));
                Utilisateur u = users.findByEmail(email).orElse(null);
                if (u != null && u.isActif()) {
                    var auth = new UsernamePasswordAuthenticationToken(
                            u, null, List.of(new SimpleGrantedAuthority("ROLE_" + u.getRole().name())));
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            } catch (Exception ignored) {
                // token invalide ou expiré : la requête reste non authentifiée (401)
            }
        }
        chain.doFilter(req, res);
    }
}
