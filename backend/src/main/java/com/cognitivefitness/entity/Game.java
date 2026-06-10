package com.cognitivefitness.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "games")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String slug;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SkillType skillType;

    @Column(nullable = false)
    @Builder.Default
    private boolean active = true;

    public enum SkillType {
        REACTION,
        MEMORY,
        ATTENTION,
        PATTERN,
        COGNITIVE_FLEXIBILITY,
        OBSERVATION,
        PROCESSING_SPEED,
        MIXED
    }
}