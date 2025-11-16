package com.erpmsa.gateway.controller;

import com.erpmsa.gateway.dto.ProductResponse;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import io.github.resilience4j.timelimiter.annotation.TimeLimiter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Collections;
import java.util.List;

/**
 * BFF (Backend for Frontend) Controller
 * 여러 서비스를 호출하여 데이터를 조합하는 엔드포인트
 */
@RestController
@RequestMapping("/api/bff")
public class BffController {

    private static final Logger log = LoggerFactory.getLogger(BffController.class);

    private final WebClient hrWebClient;
    private final WebClient inventoryWebClient;
    private final WebClient accountingWebClient;

    public BffController(
            WebClient hrWebClient,
            WebClient inventoryWebClient,
            WebClient accountingWebClient) {
        this.hrWebClient = hrWebClient;
        this.inventoryWebClient = inventoryWebClient;
        this.accountingWebClient = accountingWebClient;
    }

    /**
     * HR 서비스의 products 엔드포인트 (Inventory 서비스 데이터 조합)
     * 기존: HR → Inventory 직접 호출
     * 변경: Gateway → Inventory 호출
     * 
     * 주의: 인증/인가는 Gateway 필터에서 처리됨
     */
    @GetMapping("/products")
    @CircuitBreaker(name = "inventoryClient", fallbackMethod = "getProductsFallback")
    @Retry(name = "inventoryClient")
    @TimeLimiter(name = "inventoryClient")
    public Mono<ResponseEntity<List<ProductResponse>>> getProducts(
            @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization) {
        log.debug("BFF: Calling inventory service to get products");

        return inventoryWebClient.get()
                .uri("/api/inventory/products")
                .header(HttpHeaders.AUTHORIZATION, authorization != null ? authorization : "")
                .retrieve()
                .bodyToFlux(ProductResponse.class)
                .collectList()
                .map(ResponseEntity::ok)
                .onErrorResume(e -> {
                    log.warn("BFF: Failed to get products from inventory service: {}", e.getMessage());
                    return Mono.just(ResponseEntity.ok(Collections.emptyList()));
                });
    }

    @GetMapping("/products/{id}")
    @CircuitBreaker(name = "inventoryClient", fallbackMethod = "getProductFallback")
    @Retry(name = "inventoryClient")
    @TimeLimiter(name = "inventoryClient")
    public Mono<ResponseEntity<ProductResponse>> getProduct(
            @PathVariable Long id,
            @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization) {
        log.debug("BFF: Calling inventory service to get product: {}", id);

        return inventoryWebClient.get()
                .uri("/api/inventory/products/{id}", id)
                .header(HttpHeaders.AUTHORIZATION, authorization != null ? authorization : "")
                .retrieve()
                .bodyToMono(ProductResponse.class)
                .map(ResponseEntity::ok)
                .onErrorResume(e -> {
                    log.warn("BFF: Failed to get product {} from inventory service: {}", id, e.getMessage());
                    return Mono.just(ResponseEntity.notFound().build());
                });
    }

    // Fallback methods
    private Mono<ResponseEntity<List<ProductResponse>>> getProductsFallback(Throwable t) {
        log.warn("BFF: Circuit breaker opened for products, returning empty list. Error: {}", t.getMessage());
        return Mono.just(ResponseEntity.ok(Collections.emptyList()));
    }

    private Mono<ResponseEntity<ProductResponse>> getProductFallback(Long id, Throwable t) {
        log.warn("BFF: Circuit breaker opened for product {}, returning not found. Error: {}", id, t.getMessage());
        return Mono.just(ResponseEntity.notFound().build());
    }
}
