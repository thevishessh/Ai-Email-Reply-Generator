package com.inbooxai.controller;

import com.inbooxai.model.User;
import com.inbooxai.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !(auth.getPrincipal() instanceof User)) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(auth.getPrincipal());
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody User profileUpdate) {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !(auth.getPrincipal() instanceof User)) {
            return ResponseEntity.status(401).build();
        }
        
        User user = (User) auth.getPrincipal();
        user.setFirstName(profileUpdate.getFirstName());
        user.setLastName(profileUpdate.getLastName());
        user.setBio(profileUpdate.getBio());
        user.setRole(profileUpdate.getRole());
        user.setCompany(profileUpdate.getCompany());
        user.setAvatarUrl(profileUpdate.getAvatarUrl());
        
        userRepository.save(user);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/settings")
    public ResponseEntity<?> updateSettings(@RequestBody User settingsUpdate) {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !(auth.getPrincipal() instanceof User)) {
            return ResponseEntity.status(401).build();
        }

        User user = (User) auth.getPrincipal();
        user.setDefaultTone(settingsUpdate.getDefaultTone());
        user.setAiModel(settingsUpdate.getAiModel());
        user.setResponseLength(settingsUpdate.getResponseLength());
        if (settingsUpdate.getSettings() != null) {
            user.setSettings(settingsUpdate.getSettings());
        }
        user.setTwoFactorEnabled(settingsUpdate.isTwoFactorEnabled());
        
        userRepository.save(user);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/billing/upgrade")
    public ResponseEntity<?> upgradePlan(@RequestBody Map<String, String> planRequest) {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !(auth.getPrincipal() instanceof User)) {
            return ResponseEntity.status(401).build();
        }

        User user = (User) auth.getPrincipal();
        String newPlan = planRequest.get("plan");
        user.setCurrentPlan(newPlan);
        if ("Pro Professional".equals(newPlan)) {
            user.setTotalCredits(1000);
        } else if ("Enterprise".equals(newPlan)) {
            user.setTotalCredits(5000);
        }
        user.setUsedCredits(0);
        
        userRepository.save(user);
        return ResponseEntity.ok(user);
    }
}
