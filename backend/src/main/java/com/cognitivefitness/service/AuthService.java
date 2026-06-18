package com.cognitivefitness.service;

import com.cognitivefitness.dto.request.LoginRequest;
import com.cognitivefitness.dto.request.RegisterRequest;
import com.cognitivefitness.dto.response.AuthResponse;
import com.cognitivefitness.entity.User;
import com.cognitivefitness.exception.ApiException;
import com.cognitivefitness.repository.UserRepository;
import com.cognitivefitness.security.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;

    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ApiException("Email already in use", HttpStatus.CONFLICT);
        }

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new ApiException("Username already taken", HttpStatus.CONFLICT);
        }

        String token = UUID.randomUUID().toString();

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role(User.Role.USER)
                .emailVerified(false)
                .verificationToken(token)
                .verificationTokenExpiry(LocalDateTime.now().plusHours(24))
                .build();

        userRepository.save(user);

        try {
            emailService.sendVerificationEmail(user.getEmail(), token);
        } catch (Exception e) {
            System.err.println("Failed to send verification email: " + e.getMessage());
        }

        String jwt = jwtProvider.generateToken(user.getEmail());

        return AuthResponse.builder()
                .token(jwt)
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole().name())
                .message("Registration successful. Please check your email to verify your account.")
                .build();
    }

    public AuthResponse login(LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ApiException("User not found", HttpStatus.NOT_FOUND));

        String token = jwtProvider.generateToken(user.getEmail());

        return AuthResponse.builder()
                .token(token)
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole().name())
                .message("Login successful")
                .build();
    }

    public String verifyEmail(String token) {
        User user = userRepository.findByVerificationToken(token)
                .orElseThrow(() -> new ApiException("Invalid verification link", HttpStatus.BAD_REQUEST));

        if (user.getVerificationTokenExpiry().isBefore(LocalDateTime.now())) {
            throw new ApiException("Verification link has expired", HttpStatus.BAD_REQUEST);
        }

        user.setEmailVerified(true);
        user.setVerificationToken(null);
        userRepository.save(user);

        return "Email verified successfully!";
    }
}