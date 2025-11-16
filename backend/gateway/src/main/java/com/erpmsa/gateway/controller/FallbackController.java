package com.erpmsa.gateway.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;

/**
 * CircuitBreaker Fallback 컨트롤러
 * 서비스가 장애 상태일 때 호출되는 Fallback 엔드포인트
 */
@RestController
@RequestMapping("/fallback")
public class FallbackController {

    @RequestMapping("/auth")
    public Mono<ResponseEntity<Map<String, Object>>> authFallback() {
        return Mono.just(createErrorResponse("인증 서비스가 일시적으로 사용할 수 없습니다.", "auth-service"));
    }

    @RequestMapping("/hr")
    public Mono<ResponseEntity<Map<String, Object>>> hrFallback() {
        return Mono.just(createErrorResponse("인사 서비스가 일시적으로 사용할 수 없습니다.", "hr-service"));
    }

    @RequestMapping("/inventory")
    public Mono<ResponseEntity<Map<String, Object>>> inventoryFallback() {
        return Mono.just(createErrorResponse("재고 서비스가 일시적으로 사용할 수 없습니다.", "inventory-service"));
    }

    @RequestMapping("/accounting")
    public Mono<ResponseEntity<Map<String, Object>>> accountingFallback() {
        return Mono.just(createErrorResponse("회계 서비스가 일시적으로 사용할 수 없습니다.", "accounting-service"));
    }

    @RequestMapping("/admin")
    public Mono<ResponseEntity<Map<String, Object>>> adminFallback() {
        return Mono.just(createErrorResponse("관리자 서비스가 일시적으로 사용할 수 없습니다.", "admin-service"));
    }

    private ResponseEntity<Map<String, Object>> createErrorResponse(String message, String service) {
        Map<String, Object> error = new HashMap<>();
        error.put("error", message);
        error.put("service", service);
        error.put("status", HttpStatus.SERVICE_UNAVAILABLE.value());
        error.put("message", "Service temporarily unavailable. Please try again later.");
        
        return ResponseEntity
                .status(HttpStatus.SERVICE_UNAVAILABLE)
                .body(error);
    }
}

