package com.cognitivefitness.service;

import com.cognitivefitness.dto.response.DashboardResponse;
import com.cognitivefitness.entity.Game;
import com.cognitivefitness.entity.GameSession;
import com.cognitivefitness.entity.User;
import com.cognitivefitness.exception.ResourceNotFoundException;
import com.cognitivefitness.repository.GameSessionRepository;
import com.cognitivefitness.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageRequest;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class DashboardServiceTest {

    @Mock
    private GameSessionRepository gameSessionRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private DashboardService dashboardService;

    private User user;
    private Game game;

    @BeforeEach
    void setUp() {
        user = User.builder()
                .id("user-1")
                .username("sandy")
                .email("sandy@test.com")
                .role(User.Role.USER)
                .build();

        game = Game.builder()
                .id("game-1")
                .name("Reflex Rush")
                .slug("reflex-rush")
                .skillType(Game.SkillType.REACTION)
                .active(true)
                .build();
    }

    @Test
    void getDashboard_shouldReturnStats_withRecentActivity() {
        // Arrange
        when(userRepository.findByEmail("sandy@test.com")).thenReturn(Optional.of(user));
        when(gameSessionRepository.countByUserId("user-1")).thenReturn(3L);
        when(gameSessionRepository.getTotalScoreByUserId("user-1")).thenReturn(600);
        when(gameSessionRepository.getAverageScoreByUserId("user-1")).thenReturn(200.0);
        when(gameSessionRepository.getAverageAccuracyByUserId("user-1")).thenReturn(85.5);

        GameSession session = GameSession.builder()
                .id("session-1")
                .user(user)
                .game(game)
                .score(200)
                .durationMs(1000)
                .accuracy(85.5f)
                .playedAt(LocalDateTime.now())
                .build();

        when(gameSessionRepository.findTop5ByUserId("user-1", PageRequest.of(0, 5)))
                .thenReturn(List.of(session));

        // Act
        DashboardResponse response = dashboardService.getDashboard("sandy@test.com");

        // Assert
        assertThat(response.getUsername()).isEqualTo("sandy");
        assertThat(response.getTotalSessions()).isEqualTo(3);
        assertThat(response.getTotalScore()).isEqualTo(600);
        assertThat(response.getAverageScore()).isEqualTo(200.0);
        assertThat(response.getAverageAccuracy()).isEqualTo(85.5);
        assertThat(response.getRecentActivity()).hasSize(1);
        assertThat(response.getRecentActivity().get(0).getGameName()).isEqualTo("Reflex Rush");
        assertThat(response.getRecentActivity().get(0).getScore()).isEqualTo(200);
    }

    @Test
    void getDashboard_shouldReturnZeroStats_whenNoSessionsExist() {
        // Arrange
        when(userRepository.findByEmail("sandy@test.com")).thenReturn(Optional.of(user));
        when(gameSessionRepository.countByUserId("user-1")).thenReturn(0L);
        when(gameSessionRepository.getTotalScoreByUserId("user-1")).thenReturn(0);
        when(gameSessionRepository.getAverageScoreByUserId("user-1")).thenReturn(0.0);
        when(gameSessionRepository.getAverageAccuracyByUserId("user-1")).thenReturn(0.0);
        when(gameSessionRepository.findTop5ByUserId("user-1", PageRequest.of(0, 5)))
                .thenReturn(List.of());

        // Act
        DashboardResponse response = dashboardService.getDashboard("sandy@test.com");

        // Assert
        assertThat(response.getTotalSessions()).isZero();
        assertThat(response.getTotalScore()).isZero();
        assertThat(response.getRecentActivity()).isEmpty();
    }

    @Test
    void getDashboard_shouldThrowNotFound_whenUserDoesNotExist() {
        // Arrange
        when(userRepository.findByEmail("missing@test.com")).thenReturn(Optional.empty());

        // Act & Assert
        assertThatThrownBy(() -> dashboardService.getDashboard("missing@test.com"))
                .isInstanceOf(ResourceNotFoundException.class);
    }
}