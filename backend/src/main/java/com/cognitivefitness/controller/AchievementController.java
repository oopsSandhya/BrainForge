package com.cognitivefitness.controller;

import com.cognitivefitness.entity.Achievement;
import com.cognitivefitness.repository.UserRepository;
import com.cognitivefitness.service.AchievementService;
import com.cognitivefitness.entity.User;
import com.cognitivefitness.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/achievements")
@RequiredArgsConstructor
public class AchievementController {

    private final AchievementService achievementService;
    private final UserRepository userRepository;

    @GetMapping
    public List<Achievement> getMyAchievements(Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", email));
        return achievementService.getUserAchievements(user.getId());
    }
}