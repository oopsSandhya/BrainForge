package com.cognitivefitness.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "leaderboard_entries",
       uniqueConstraints = {
           @UniqueConstraint(columnNames = {"user_id", "game_id", "period"})
       })
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LeaderboardEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id", nullable = false)
    private Game game;

    @Column(nullable = false)
    private int bestScore;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Period period;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public enum Period {
        DAILY, WEEKLY, ALL_TIME
    }
}