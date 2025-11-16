package com.erpmsa.inventory.controller;

import com.erpmsa.inventory.dto.ProductResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
public class ProductController {

    @GetMapping("/products")
    public ResponseEntity<List<ProductResponse>> getProducts() {
        // 임시 데이터 반환
        return ResponseEntity.ok(List.of(
                new ProductResponse(1L, "노트북", "LAP-001", 50),
                new ProductResponse(2L, "마우스", "MOU-001", 200),
                new ProductResponse(3L, "키보드", "KEY-001", 150)
        ));
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<ProductResponse> getProduct(Long id) {
        // 임시 데이터 반환
        return ResponseEntity.ok(new ProductResponse(id, "노트북", "LAP-001", 50));
    }
}

