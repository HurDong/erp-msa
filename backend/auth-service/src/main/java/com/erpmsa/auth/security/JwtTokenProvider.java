package com.erpmsa.auth.security;

import com.erpmsa.auth.domain.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenProvider {

    private final Key signingKey;
    private final long expirationMillis;

    public JwtTokenProvider(
            @Value("${app.jwt.secret}") String secret,
            @Value("${app.jwt.expiration}") long expirationMillis
    ) {
        this.signingKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(ensureBase64(secret)));
        this.expirationMillis = expirationMillis;
    }

    public String generateToken(User user) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + expirationMillis);

        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("role", user.getRole().name())
                .claim("name", user.getFullName())
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(signingKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public long getExpirationMillis() {
        return expirationMillis;
    }

    private static String ensureBase64(String secret) {
        if (secret == null || secret.isBlank()) {
            throw new IllegalArgumentException("JWT secret must not be blank");
        }
        // If provided secret isn't Base64 encoded, encode it using UTF-8 bytes
        try {
            Decoders.BASE64.decode(secret);
            return secret;
        } catch (RuntimeException ex) {
            return java.util.Base64.getEncoder()
                    .encodeToString(secret.getBytes(java.nio.charset.StandardCharsets.UTF_8));
        }
    }
}

