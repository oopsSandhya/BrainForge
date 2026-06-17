package com.cognitivefitness.service;

import com.cognitivefitness.entity.Achievement;
import com.cognitivefitness.entity.User;
import com.cognitivefitness.repository.AchievementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AchievementService {

    private final AchievementRepository achievementRepository;

    public List<Achievement> getUserAchievements(String userId) {
        return achievementRepository.findByUserIdOrderByEarnedAtDesc(userId);
    }

    public void checkAndAwardAchievements(User user) {

        // First Game
        if (!achievementRepository.existsByUserIdAndType(user.getId(), Achievement.AchievementType.FIRST_GAME)) {
            award(user, Achievement.AchievementType.FIRST_GAME, "First Game!", "Played your first game", "🎮");
        }

        // Streak achievements
        if (user.getCurrentStreak() >= 3 &&
            !achievementRepository.existsByUserIdAndType(user.getId(), Achievement.AchievementType.STREAK)) {
            award(user, Achievement.AchievementType.STREAK, "3 Day Streak!", "Played 3 days in a row", "🔥");
        }

        // High Score
        if (user.getGameSessions() != null) {
            long totalSessions = user.getGameSessions().size();
            if (totalSessions >= 10 &&
                !achievementRepository.existsByUserIdAndType(user.getId(), Achievement.AchievementType.HIGH_SCORE)) {
                award(user, Achievement.AchievementType.HIGH_SCORE, "Dedicated Trainer", "Played 10 sessions", "⭐");
            }
        }
    }

    private void award(User user, Achievement.AchievementType type, String title, String desc, String icon) {
        Achievement achievement = Achievement.builder()
                .user(user)
                .type(type)
                .title(title)
                .description(desc)
                .icon(icon)
                .build();
        achievementRepository.save(achievement);
    }
}