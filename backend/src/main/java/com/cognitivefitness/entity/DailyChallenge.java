package com.cognitivefitness.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "daily_challenges",
       uniqueConstraints = {
           @UniqueConstraint(columnNames = {"user_id", "challenge_date"})
       })
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DailyChallenge {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private LocalDate challengeDate;

    @Column(nullable = false)
    @Builder.Default
    private boolean completed = false;

    private int score;

    @CreationTimestamp
    private LocalDateTime createdAt;
}