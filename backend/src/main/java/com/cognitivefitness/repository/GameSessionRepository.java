package com.cognitivefitness.repository;

import com.cognitivefitness.entity.GameSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface GameSessionRepository extends JpaRepository<GameSession, String> {

    List<GameSession> findByUserIdOrderByPlayedAtDesc(String userId);

    List<GameSession> findByUserIdAndGameIdOrderByScoreDesc(String userId, String gameId);

    List<GameSession> findByUserIdAndPlayedAtAfterOrderByPlayedAtDesc(
            String userId, LocalDateTime after);

    @Query("SELECT AVG(gs.score) FROM GameSession gs WHERE gs.user.id = :userId AND gs.game.id = :gameId")
    Double findAverageScoreByUserAndGame(@Param("userId") String userId,
                                         @Param("gameId") String gameId);

    @Query("SELECT COUNT(gs) FROM GameSession gs WHERE gs.user.id = :userId")
    Long countTotalSessionsByUser(@Param("userId") String userId);
}