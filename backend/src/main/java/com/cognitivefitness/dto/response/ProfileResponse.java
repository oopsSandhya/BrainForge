package com.cognitivefitness.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileResponse {

    private String username;
    private String email;
    private LocalDateTime joinedAt;
    private int totalSessions;
    private int totalScore;
    private int currentStreak;
    private int longestStreak;
    private int totalAchievements;
}