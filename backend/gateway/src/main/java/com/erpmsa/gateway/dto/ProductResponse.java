package com.erpmsa.gateway.dto;

public record ProductResponse(
        Long id,
        String name,
        String sku,
        Integer stock
) {
}

