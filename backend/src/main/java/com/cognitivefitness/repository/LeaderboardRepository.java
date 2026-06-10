package com.cognitivefitness.repository;

import com.cognitivefitness.entity.LeaderboardEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LeaderboardRepository extends JpaRepository<LeaderboardEntry, String> {

    List<LeaderboardEntry> findByGameIdAndPeriodOrderByBestScoreDesc(
            String gameId, LeaderboardEntry.Period period);

    Optional<LeaderboardEntry> findByUserIdAndGameIdAndPeriod(
            String userId, String gameId, LeaderboardEntry.Period period);

    @Query("SELECT le FROM LeaderboardEntry le WHERE le.period = :period " +
           "ORDER BY le.bestScore DESC")
    List<LeaderboardEntry> findGlobalLeaderboard(
            @Param("period") LeaderboardEntry.Period period);
}