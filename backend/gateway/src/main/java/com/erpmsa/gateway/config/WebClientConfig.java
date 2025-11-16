package com.erpmsa.gateway.config;

import com.erpmsa.common.CommonConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.netty.http.client.HttpClient;

import java.time.Duration;

@Configuration
public class WebClientConfig {

    private final CommonConfig commonConfig;

    public WebClientConfig(@Autowired(required = false) CommonConfig commonConfig) {
        this.commonConfig = commonConfig;
    }

    @Bean
    public WebClient hrWebClient(@Value("${services.hr.url:http://hr-service:8082}") String hrUrl) {
        return createWebClient(hrUrl);
    }

    @Bean
    public WebClient inventoryWebClient(@Value("${services.inventory.url:http://inventory-service:8083}") String inventoryUrl) {
        return createWebClient(inventoryUrl);
    }

    @Bean
    public WebClient accountingWebClient(@Value("${services.accounting.url:http://accounting-service:8084}") String accountingUrl) {
        return createWebClient(accountingUrl);
    }

    private WebClient createWebClient(String baseUrl) {
        WebClient.Builder builder;
        
        if (commonConfig != null) {
            try {
                builder = commonConfig.webClientBuilder();
            } catch (Exception e) {
                builder = createDefaultWebClientBuilder();
            }
        } else {
            builder = createDefaultWebClientBuilder();
        }
        
        return builder.baseUrl(baseUrl).build();
    }

    private WebClient.Builder createDefaultWebClientBuilder() {
        HttpClient httpClient = HttpClient.create()
                .responseTimeout(Duration.ofSeconds(2))
                .connectTimeout(Duration.ofMillis(500));
        
        return WebClient.builder()
                .clientConnector(new ReactorClientHttpConnector(httpClient));
    }
}

