package com.erpmsa.gateway.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Base64;
import java.util.List;

@Component
public class JwtUtil {

    private final Key signingKey;

    public JwtUtil(@Value("${app.jwt.secret}") String secret) {
        this.signingKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(ensureBase64(secret)));
    }

    public Claims parseToken(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(signingKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            throw new RuntimeException("Invalid JWT token", e);
        }
    }

    public String getRole(Claims claims) {
        return claims.get("role", String.class);
    }

    @SuppressWarnings("unchecked")
    public List<String> getPermissions(Claims claims) {
        Object permissions = claims.get("permissions");
        if (permissions instanceof List) {
            return (List<String>) permissions;
        }
        return List.of();
    }

    public String getEmail(Claims claims) {
        return claims.getSubject();
    }

    public boolean isTokenExpired(Claims claims) {
        return claims.getExpiration().before(new java.util.Date());
    }

    private static String ensureBase64(String secret) {
        if (secret == null || secret.isBlank()) {
            throw new IllegalArgumentException("JWT secret must not be blank");
        }
        try {
            Decoders.BASE64.decode(secret);
            return secret;
        } catch (RuntimeException ex) {
            return Base64.getEncoder()
                    .encodeToString(secret.getBytes(StandardCharsets.UTF_8));
        }
    }
}

