package com.erpmsa.gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

/**
 * Gateway Security 설정
 * 
 * 주의: Spring Cloud Gateway는 WebFlux 기반이므로 
 * 실제 인증/인가는 GlobalFilter에서 처리됩니다.
 * 여기서는 기본적인 보안 설정만 구성합니다.
 */
@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        return http
                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                .headers(headers -> headers.frameOptions(ServerHttpSecurity.HeaderSpec.FrameOptionsSpec::disable))
                .authorizeExchange(exchanges -> exchanges
                        // Actuator 엔드포인트는 허용
                        .pathMatchers("/actuator/**").permitAll()
                        // 나머지는 필터에서 처리 (GlobalFilter가 인증/인가 처리)
                        .anyExchange().permitAll()
                )
                .build();
    }
}

