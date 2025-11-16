package com.erpmsa.hr.service;

import com.erpmsa.hr.dto.ProductResponse;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import io.github.resilience4j.timelimiter.annotation.TimeLimiter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.Collections;
import java.util.List;

@Service
public class InventoryClientService {

    private static final Logger log = LoggerFactory.getLogger(InventoryClientService.class);
    private final WebClient inventoryWebClient;

    public InventoryClientService(WebClient inventoryWebClient) {
        this.inventoryWebClient = inventoryWebClient;
    }

    @CircuitBreaker(name = "inventoryClient", fallbackMethod = "getProductsFallback")
    @Retry(name = "inventoryClient")
    @TimeLimiter(name = "inventoryClient")
    public Mono<List<ProductResponse>> getProducts() {
        log.debug("Calling inventory service to get products");
        
        return inventoryWebClient.get()
                .uri("/api/inventory/products")
                .retrieve()
                .bodyToFlux(ProductResponse.class)
                .collectList()
                .timeout(Duration.ofSeconds(2));
    }

    @CircuitBreaker(name = "inventoryClient", fallbackMethod = "getProductFallback")
    @Retry(name = "inventoryClient")
    @TimeLimiter(name = "inventoryClient")
    public Mono<ProductResponse> getProduct(Long productId) {
        log.debug("Calling inventory service to get product: {}", productId);
        
        return inventoryWebClient.get()
                .uri("/api/inventory/products/{id}", productId)
                .retrieve()
                .bodyToMono(ProductResponse.class)
                .timeout(Duration.ofSeconds(2));
    }

    // Fallback methods
    private Mono<List<ProductResponse>> getProductsFallback(Throwable t) {
        log.warn("Inventory service call failed, returning empty list. Error: {}", t.getMessage());
        return Mono.just(Collections.emptyList());
    }

    private Mono<ProductResponse> getProductFallback(Long productId, Throwable t) {
        log.warn("Inventory service call failed for productId: {}, returning null. Error: {}", productId, t.getMessage());
        return Mono.empty();
    }
}

