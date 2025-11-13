package com.erpmsa.gateway.filter;

import com.erpmsa.gateway.util.JwtUtil;
import io.jsonwebtoken.Claims;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.List;

/**
 * JWT 토큰 검증 필터
 * Authorization 헤더에서 JWT 토큰을 추출하고 검증
 * 검증된 토큰의 정보를 요청 헤더에 추가하여 하위 서비스로 전달
 */
@Component
public class JwtAuthenticationFilter implements GlobalFilter, Ordered {

    private static final Logger log = LoggerFactory.getLogger(JwtAuthenticationFilter.class);
    private static final String AUTHORIZATION_HEADER = "Authorization";
    private static final String BEARER_PREFIX = "Bearer ";
    private static final String ROLE_HEADER = "X-User-Role";
    private static final String EMAIL_HEADER = "X-User-Email";
    private static final String PERMISSIONS_HEADER = "X-User-Permissions";
    private static final int ORDER = -50; // RequestLoggingFilter 다음

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        String path = request.getURI().getPath();

        // 인증이 필요 없는 경로는 통과
        if (isPublicPath(path)) {
            return chain.filter(exchange);
        }

        // Authorization 헤더에서 토큰 추출
        String authHeader = request.getHeaders().getFirst(AUTHORIZATION_HEADER);
        if (!StringUtils.hasText(authHeader) || !authHeader.startsWith(BEARER_PREFIX)) {
            log.warn("Missing or invalid Authorization header for path: {}", path);
            return onError(exchange, "Missing or invalid Authorization header", HttpStatus.UNAUTHORIZED);
        }

        String token = authHeader.substring(BEARER_PREFIX.length());

        try {
            // JWT 토큰 검증 및 파싱
            Claims claims = jwtUtil.parseToken(token);

            // 토큰 만료 확인
            if (jwtUtil.isTokenExpired(claims)) {
                log.warn("Expired JWT token for path: {}", path);
                return onError(exchange, "Token has expired", HttpStatus.UNAUTHORIZED);
            }

            // 사용자 정보 추출
            String role = jwtUtil.getRole(claims);
            String email = jwtUtil.getEmail(claims);
            List<String> permissions = jwtUtil.getPermissions(claims);

            log.debug("Authenticated user: {} with role: {} for path: {}", email, role, path);

            // 검증된 사용자 정보를 요청 헤더에 추가
            ServerHttpRequest modifiedRequest = request.mutate()
                    .header(ROLE_HEADER, role)
                    .header(EMAIL_HEADER, email)
                    .header(PERMISSIONS_HEADER, String.join(",", permissions))
                    .build();

            ServerWebExchange modifiedExchange = exchange.mutate()
                    .request(modifiedRequest)
                    .build();

            return chain.filter(modifiedExchange);

        } catch (Exception e) {
            log.error("JWT validation failed for path: {}", path, e);
            return onError(exchange, "Invalid JWT token: " + e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }

    private boolean isPublicPath(String path) {
        // 인증이 필요 없는 공개 경로
        return path.startsWith("/api/auth/") || 
               path.startsWith("/actuator/") ||
               path.equals("/favicon.ico");
    }

    private Mono<Void> onError(ServerWebExchange exchange, String message, HttpStatus status) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(status);
        response.getHeaders().add("Content-Type", "application/json");
        
        String errorBody = String.format("{\"error\":\"%s\",\"status\":%d}", message, status.value());
        return response.writeWith(
                Mono.just(response.bufferFactory().wrap(errorBody.getBytes()))
        );
    }

    @Override
    public int getOrder() {
        return ORDER;
    }
}

