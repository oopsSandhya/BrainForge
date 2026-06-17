package com.cognitivefitness.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "achievements")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Achievement {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AchievementType type;

    @Column(nullable = false)
    private String title;

    private String description;

    private String icon;

    @CreationTimestamp
    private LocalDateTime earnedAt;

    public enum AchievementType {
        STREAK,
        HIGH_SCORE,
        FIRST_GAME,
        SPEED_DEMON,
        MEMORY_MASTER,
        PERFECT_SCORE,
        DAILY_CHAMPION,
        BOSS_SLAYER
    }
}