package com.erpmsa.auth.dto;

import java.util.Collection;
import java.util.List;

public record AuthResponse(
        String accessToken,
        String tokenType,
        long expiresIn,
        String email,
        String fullName,
        String role,
        List<String> permissions
) {
    public static AuthResponse of(String accessToken, long expiresIn, String email, String fullName, String role, Collection<String> permissions) {
        return new AuthResponse(accessToken, "Bearer", expiresIn, email, fullName, role, List.copyOf(permissions));
    }
}

