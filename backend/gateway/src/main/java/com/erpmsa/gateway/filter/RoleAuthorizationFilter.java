package com.erpmsa.gateway.filter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

import java.util.Arrays;
import java.util.List;
import java.util.Set;

/**
 * 역할 기반 접근 제어 필터
 * 사용자의 역할에 따라 특정 경로 접근을 제한
 */
@Component
public class RoleAuthorizationFilter implements GlobalFilter, Ordered {

    private static final Logger log = LoggerFactory.getLogger(RoleAuthorizationFilter.class);
    private static final String ROLE_HEADER = "X-User-Role";
    private static final String PERMISSIONS_HEADER = "X-User-Permissions";
    private static final int ORDER = -25; // JwtAuthenticationFilter 다음

    // 역할별 접근 가능한 경로 정의
    private static final Set<String> ADMIN_ONLY_PATHS = Set.of(
            "/api/admin"
    );

    private static final Set<String> MANAGER_OR_ADMIN_PATHS = Set.of(
            "/api/accounting",
            "/api/inventory"
    );

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        String path = request.getURI().getPath();

        // 공개 경로는 통과
        if (isPublicPath(path)) {
            return chain.filter(exchange);
        }

        // 역할 정보 추출
        String role = request.getHeaders().getFirst(ROLE_HEADER);
        String permissionsHeader = request.getHeaders().getFirst(PERMISSIONS_HEADER);

        // 역할이 없으면 (인증되지 않은 요청) 통과 (이미 JwtAuthenticationFilter에서 처리됨)
        if (!StringUtils.hasText(role)) {
            return chain.filter(exchange);
        }

        // 권한 정보 파싱
        List<String> permissions = permissionsHeader != null 
                ? Arrays.asList(permissionsHeader.split(","))
                : List.of();

        // 경로별 권한 체크
        if (isAdminOnlyPath(path) && !isAdmin(role)) {
            log.warn("Access denied: User with role {} attempted to access admin path: {}", role, path);
            return onError(exchange, "Access denied: Admin role required", HttpStatus.FORBIDDEN);
        }

        if (isManagerOrAdminPath(path) && !isManagerOrAdmin(role)) {
            log.warn("Access denied: User with role {} attempted to access manager/admin path: {}", role, path);
            return onError(exchange, "Access denied: Manager or Admin role required", HttpStatus.FORBIDDEN);
        }

        // 권한 기반 세부 접근 제어 (예: hr:write 권한이 있어야 POST/PUT/DELETE 가능)
        if (requiresWritePermission(path, request.getMethod().name()) && 
            !hasPermission(permissions, getRequiredPermission(path))) {
            log.warn("Access denied: User with role {} lacks required permission for path: {}", role, path);
            return onError(exchange, "Access denied: Insufficient permissions", HttpStatus.FORBIDDEN);
        }

        return chain.filter(exchange);
    }

    private boolean isPublicPath(String path) {
        return path.startsWith("/api/auth/") || 
               path.startsWith("/actuator/");
    }

    private boolean isAdminOnlyPath(String path) {
        return ADMIN_ONLY_PATHS.stream().anyMatch(path::startsWith);
    }

    private boolean isManagerOrAdminPath(String path) {
        return MANAGER_OR_ADMIN_PATHS.stream().anyMatch(path::startsWith);
    }

    private boolean isAdmin(String role) {
        return "ADMIN".equalsIgnoreCase(role);
    }

    private boolean isManagerOrAdmin(String role) {
        return "MANAGER".equalsIgnoreCase(role) || "ADMIN".equalsIgnoreCase(role);
    }

    private boolean requiresWritePermission(String path, String method) {
        // POST, PUT, DELETE, PATCH 메서드는 쓰기 권한 필요
        return ("POST".equals(method) || 
                "PUT".equals(method) || 
                "DELETE".equals(method) || 
                "PATCH".equals(method));
    }

    private String getRequiredPermission(String path) {
        // 경로에 따라 필요한 권한 반환
        if (path.startsWith("/api/hr")) {
            return "hr:write";
        } else if (path.startsWith("/api/inventory")) {
            return "inventory:write";
        } else if (path.startsWith("/api/accounting")) {
            return "accounting:write";
        } else if (path.startsWith("/api/admin")) {
            return "admin:write";
        }
        return null;
    }

    private boolean hasPermission(List<String> permissions, String requiredPermission) {
        if (requiredPermission == null) {
            return true; // 권한 요구사항이 없으면 통과
        }
        return permissions.contains(requiredPermission);
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

