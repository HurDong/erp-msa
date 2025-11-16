package com.erpmsa.hr.config;

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

    @Autowired(required = false)
    private WebClient.Builder webClientBuilder;

    @Bean
    public WebClient inventoryWebClient(@Value("${services.inventory.url}") String inventoryUrl) {
        WebClient.Builder builder = webClientBuilder != null 
                ? webClientBuilder 
                : createDefaultWebClientBuilder();
        
        return builder
                .baseUrl(inventoryUrl)
                .build();
    }

    private WebClient.Builder createDefaultWebClientBuilder() {
        HttpClient httpClient = HttpClient.create()
                .responseTimeout(Duration.ofSeconds(2))
                .connectTimeout(Duration.ofMillis(500));
        
        return WebClient.builder()
                .clientConnector(new ReactorClientHttpConnector(httpClient));
    }
}

