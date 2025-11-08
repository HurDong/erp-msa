package com.erpmsa.auth.config;

import com.erpmsa.auth.domain.Role;
import com.erpmsa.auth.domain.User;
import com.erpmsa.auth.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AuthDataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(AuthDataInitializer.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthDataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (userRepository.existsByEmail("admin@erpmsa.local")) {
            return;
        }

        User admin = new User(
                "admin@erpmsa.local",
                passwordEncoder.encode("ChangeMe123!"),
                "시스템 관리자",
                Role.ADMIN
        );
        userRepository.save(admin);
        log.info("기본 관리자 계정을 생성했습니다. email=admin@erpmsa.local / password=ChangeMe123!");
    }
}

