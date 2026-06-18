package com.cognitivefitness;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication(
    scanBasePackages = "com.cognitivefitness",
    exclude = { UserDetailsServiceAutoConfiguration.class }
)
@EnableCaching
public class CognitiveFitnessApplication {

    public static void main(String[] args) {
        SpringApplication.run(CognitiveFitnessApplication.class, args);
    }
}