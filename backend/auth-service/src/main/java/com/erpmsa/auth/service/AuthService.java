package com.erpmsa.auth.service;

import com.erpmsa.auth.domain.Role;
import com.erpmsa.auth.domain.User;
import com.erpmsa.auth.dto.AuthResponse;
import com.erpmsa.auth.dto.LoginRequest;
import com.erpmsa.auth.dto.RegisterRequest;
import com.erpmsa.auth.repository.UserRepository;
import com.erpmsa.auth.security.JwtTokenProvider;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new ResponseStatusException(BAD_REQUEST, "이미 사용 중인 이메일입니다.");
        }

        User user = new User(
                request.email().toLowerCase(),
                passwordEncoder.encode(request.password()),
                request.fullName(),
                Role.USER
        );

        userRepository.save(user);

        String token = jwtTokenProvider.generateToken(user);
        return AuthResponse.of(token, jwtTokenProvider.getExpirationMillis(), user.getEmail(), user.getFullName(), user.getRole().name());
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.email().toLowerCase())
                .orElseThrow(() -> new ResponseStatusException(UNAUTHORIZED, "이메일 또는 비밀번호가 올바르지 않습니다."));

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new ResponseStatusException(UNAUTHORIZED, "이메일 또는 비밀번호가 올바르지 않습니다.");
        }

        String token = jwtTokenProvider.generateToken(user);
        return AuthResponse.of(token, jwtTokenProvider.getExpirationMillis(), user.getEmail(), user.getFullName(), user.getRole().name());
    }
}

