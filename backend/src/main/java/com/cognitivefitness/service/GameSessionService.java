package com.cognitivefitness.service;

import com.cognitivefitness.dto.request.SaveSessionRequest;
import com.cognitivefitness.entity.Game;
import com.cognitivefitness.entity.GameSession;
import com.cognitivefitness.entity.User;
import com.cognitivefitness.exception.ResourceNotFoundException;
import com.cognitivefitness.repository.GameRepository;
import com.cognitivefitness.repository.GameSessionRepository;
import com.cognitivefitness.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class GameSessionService {

    private final GameSessionRepository gameSessionRepository;
    private final UserRepository userRepository;
    private final GameRepository gameRepository;

    public GameSession saveSession(String email, SaveSessionRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", email));

        Game game = gameRepository.findBySlug(request.getGameSlug())
                .orElseThrow(() -> new ResourceNotFoundException("Game", request.getGameSlug()));

        // Streak logic
        LocalDate today = LocalDate.now();
        LocalDate lastPlayed = user.getLastPlayedDate();

        if (lastPlayed == null || lastPlayed.isBefore(today.minusDays(1))) {
            // First time ever, or missed a day — reset streak
            user.setCurrentStreak(1);
        } else if (lastPlayed.isBefore(today)) {
            // Played yesterday — increment streak
            user.setCurrentStreak(user.getCurrentStreak() + 1);
        }
        // If lastPlayed == today, don't change streak (already played today)

        // Update longest streak
        if (user.getCurrentStreak() > user.getLongestStreak()) {
            user.setLongestStreak(user.getCurrentStreak());
        }

        user.setLastPlayedDate(today);
        userRepository.save(user);

        GameSession session = GameSession.builder()
                .user(user)
                .game(game)
                .score(request.getScore())
                .durationMs(request.getDurationMs())
                .accuracy(request.getAccuracy())
                .metadata(request.getMetadata())
                .build();

        return gameSessionRepository.save(session);
    }
}