package com.cognitivefitness.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    public void sendVerificationEmail(String toEmail, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Verify your BrainForge account 🧠");
        message.setText(
            "Welcome to BrainForge!\n\n" +
            "Please verify your email by clicking the link below:\n\n" +
            frontendUrl + "/verify-email?token=" + token + "\n\n" +
            "This link will expire in 24 hours.\n\n" +
            "If you didn't create this account, you can ignore this email."
        );
        mailSender.send(message);
    }
}