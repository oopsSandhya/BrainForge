package com.cognitivefitness.repository;

import com.cognitivefitness.entity.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AchievementRepository extends JpaRepository<Achievement, String> {

    List<Achievement> findByUserIdOrderByEarnedAtDesc(String userId);

    boolean existsByUserIdAndType(String userId, Achievement.AchievementType type);

    long countByUserId(String userId);
}