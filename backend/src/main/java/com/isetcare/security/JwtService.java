package com.isetcare.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {
    private final SecretKey key;
    private final long expirationMs;

    public JwtService(@Value("${app.jwt.secret}") String secret,
                      @Value("${app.jwt.expiration-hours}") long hours) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.expirationMs = hours * 3600_000L;
    }

    public String generate(String email, String role) {
        Date now = new Date();
        return Jwts.builder().subject(email).claim("role", role)
                .issuedAt(now).expiration(new Date(now.getTime() + expirationMs))
                .signWith(key).compact();
    }

    /** Retourne l'email contenu dans le token, ou lève JwtException si invalide / expiré. */
    public String extractEmail(String token) {
        Claims claims = Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
        return claims.getSubject();
    }
}
