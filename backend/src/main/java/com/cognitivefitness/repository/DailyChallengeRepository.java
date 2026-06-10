package com.cognitivefitness.repository;

import com.cognitivefitness.entity.DailyChallenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface DailyChallengeRepository extends JpaRepository<DailyChallenge, String> {

    Optional<DailyChallenge> findByUserIdAndChallengeDate(
            String userId, LocalDate challengeDate);

    List<DailyChallenge> findByUserIdOrderByChallengeDateDesc(String userId);

    boolean existsByUserIdAndChallengeDate(String userId, LocalDate challengeDate);

    long countByUserIdAndCompletedTrue(String userId);
}