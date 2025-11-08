package com.erpmsa.auth.dto;

public record AuthResponse(
        String accessToken,
        String tokenType,
        long expiresIn,
        String email,
        String fullName,
        String role
) {
    public static AuthResponse of(String accessToken, long expiresIn, String email, String fullName, String role) {
        return new AuthResponse(accessToken, "Bearer", expiresIn, email, fullName, role);
    }
}

