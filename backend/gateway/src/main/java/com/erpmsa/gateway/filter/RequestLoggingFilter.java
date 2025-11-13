package com.erpmsa.gateway.filter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.UUID;

/**
 * 요청 로깅 및 트레이싱을 위한 필터
 * 요청 ID를 생성하고 MDC에 저장하여 로그 추적 가능하게 함
 */
@Component
public class RequestLoggingFilter implements GlobalFilter, Ordered {

    private static final Logger log = LoggerFactory.getLogger(RequestLoggingFilter.class);
    private static final String REQUEST_ID_HEADER = "X-Request-Id";
    private static final int ORDER = -100; // 가장 먼저 실행

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        
        // 요청 ID 생성 또는 기존 헤더에서 가져오기
        String requestId = request.getHeaders().getFirst(REQUEST_ID_HEADER);
        if (requestId == null || requestId.isBlank()) {
            requestId = UUID.randomUUID().toString();
        }

        // MDC에 요청 ID 저장 (로그 추적용)
        MDC.put("requestId", requestId);

        // 요청 정보 로깅
        log.info("Incoming request: {} {} from {}", 
                request.getMethod(), 
                request.getURI().getPath(),
                request.getRemoteAddress());

        // 요청 ID를 헤더에 추가하여 하위 서비스로 전달
        ServerHttpRequest modifiedRequest = request.mutate()
                .header(REQUEST_ID_HEADER, requestId)
                .build();

        ServerWebExchange modifiedExchange = exchange.mutate()
                .request(modifiedRequest)
                .build();

        return chain.filter(modifiedExchange)
                .doFinally(signalType -> {
                    log.info("Request completed: {} {} - Status: {}", 
                            request.getMethod(), 
                            request.getURI().getPath(),
                            exchange.getResponse().getStatusCode());
                    MDC.clear();
                });
    }

    @Override
    public int getOrder() {
        return ORDER;
    }
}

