package com.cognitivefitness.repository;

import com.cognitivefitness.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GameRepository extends JpaRepository<Game, String> {

    Optional<Game> findBySlug(String slug);

    List<Game> findByActiveTrue();
}