package com.cognitivefitness.service;

import com.cognitivefitness.dto.request.ChangePasswordRequest;
import com.cognitivefitness.dto.request.UpdateProfileRequest;
import com.cognitivefitness.dto.response.ProfileResponse;
import com.cognitivefitness.entity.User;
import com.cognitivefitness.exception.ApiException;
import com.cognitivefitness.exception.ResourceNotFoundException;
import com.cognitivefitness.repository.AchievementRepository;
import com.cognitivefitness.repository.GameSessionRepository;
import com.cognitivefitness.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final GameSessionRepository gameSessionRepository;
    private final AchievementRepository achievementRepository;
    private final PasswordEncoder passwordEncoder;

    public ProfileResponse getProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", email));

        long totalSessions = gameSessionRepository.countByUserId(user.getId());
        int totalScore = gameSessionRepository.getTotalScoreByUserId(user.getId());
        long totalAchievements = achievementRepository.countByUserId(user.getId());

        return ProfileResponse.builder()
                .username(user.getUsername())
                .email(user.getEmail())
                .joinedAt(user.getCreatedAt())
                .totalSessions((int) totalSessions)
                .totalScore(totalScore)
                .currentStreak(user.getCurrentStreak())
                .longestStreak(user.getLongestStreak())
                .totalAchievements((int) totalAchievements)
                .build();
    }

    public ProfileResponse updateProfile(String email, UpdateProfileRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", email));

        if (request.getUsername() != null && !request.getUsername().isBlank()) {
            if (!request.getUsername().equals(user.getUsername()) &&
                userRepository.existsByUsername(request.getUsername())) {
              throw new ApiException("Username already taken", org.springframework.http.HttpStatus.BAD_REQUEST);
            }
            user.setUsername(request.getUsername());
        }

        userRepository.save(user);
        return getProfile(email);
    }

    public void changePassword(String email, ChangePasswordRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", email));

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPasswordHash())) {
          throw new ApiException("Current password is incorrect", org.springframework.http.HttpStatus.BAD_REQUEST);
        }

        user.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }
}