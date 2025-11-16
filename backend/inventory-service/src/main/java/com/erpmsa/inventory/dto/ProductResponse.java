package com.erpmsa.inventory.dto;

public record ProductResponse(
        Long id,
        String name,
        String sku,
        Integer stock
) {
}

