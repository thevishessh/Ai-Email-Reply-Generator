package com.inbooxai.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;

import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Document(collection = "users")
public class User implements UserDetails {
    @Id
    private String id;
    
    private String firstName;
    private String lastName;
    @Indexed(unique = true)
    private String email;
    private String password;

    private String role;
    
    // Additional fields for profile and settings
    private String bio;
    private String company;
    private String avatarUrl;
    private String defaultTone;
    private String aiModel;
    private String responseLength;
    private boolean twoFactorEnabled;
    private UserSettings settings;

    // Billing fields
    private String currentPlan;
    private int totalCredits;
    private int usedCredits;

    public static class UserSettings {
        private boolean activity;
        private boolean weeklyUsage;
        private boolean writingTips;
        private boolean announcements;

        public UserSettings() {
            this.activity = true;
            this.weeklyUsage = true;
            this.writingTips = false;
            this.announcements = true;
        }

        // Getters and Setters
        public boolean isActivity() { return activity; }
        public void setActivity(boolean activity) { this.activity = activity; }
        public boolean isWeeklyUsage() { return weeklyUsage; }
        public void setWeeklyUsage(boolean weeklyUsage) { this.weeklyUsage = weeklyUsage; }
        public boolean isWritingTips() { return writingTips; }
        public void setWritingTips(boolean writingTips) { this.writingTips = writingTips; }
        public boolean isAnnouncements() { return announcements; }
        public void setAnnouncements(boolean announcements) { this.announcements = announcements; }
    }

    public User() {
        this.role = "USER";
        this.currentPlan = "Free Starter";
        this.totalCredits = 50;
        this.usedCredits = 0;
        this.settings = new UserSettings();
    }

    public User(String id, String firstName, String lastName, String email, String password, String role) {
        this();
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        if (role != null && !role.isEmpty()) {
            this.role = role;
        }
    }

    public static UserBuilder builder() {
        return new UserBuilder();
    }

    public static class UserBuilder {
        private String id;
        private String firstName;
        private String lastName;
        private String email;
        private String password;
        private String role;
        private String bio;
        private String company;
        private String avatarUrl;
        private String defaultTone;
        private String aiModel;
        private String responseLength;
        private boolean twoFactorEnabled;
        private UserSettings settings;
        private String currentPlan;
        private int totalCredits;
        private int usedCredits;

        public UserBuilder id(String id) { this.id = id; return this; }
        public UserBuilder firstName(String firstName) { this.firstName = firstName; return this; }
        public UserBuilder lastName(String lastName) { this.lastName = lastName; return this; }
        public UserBuilder email(String email) { this.email = email; return this; }
        public UserBuilder password(String password) { this.password = password; return this; }
        public UserBuilder role(String role) { this.role = role; return this; }
        public UserBuilder bio(String bio) { this.bio = bio; return this; }
        public UserBuilder company(String company) { this.company = company; return this; }
        public UserBuilder avatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; return this; }
        public UserBuilder defaultTone(String defaultTone) { this.defaultTone = defaultTone; return this; }
        public UserBuilder aiModel(String aiModel) { this.aiModel = aiModel; return this; }
        public UserBuilder responseLength(String responseLength) { this.responseLength = responseLength; return this; }
        public UserBuilder twoFactorEnabled(boolean twoFactorEnabled) { this.twoFactorEnabled = twoFactorEnabled; return this; }
        public UserBuilder settings(UserSettings settings) { this.settings = settings; return this; }
        public UserBuilder currentPlan(String currentPlan) { this.currentPlan = currentPlan; return this; }
        public UserBuilder totalCredits(int totalCredits) { this.totalCredits = totalCredits; return this; }
        public UserBuilder usedCredits(int usedCredits) { this.usedCredits = usedCredits; return this; }
        
        public User build() {
            User user = new User(id, firstName, lastName, email, password, role);
            user.setBio(bio);
            user.setCompany(company);
            user.setAvatarUrl(avatarUrl);
            user.setDefaultTone(defaultTone);
            user.setAiModel(aiModel);
            user.setResponseLength(responseLength);
            user.setTwoFactorEnabled(twoFactorEnabled);
            if (settings != null) user.setSettings(settings);
            if (currentPlan != null) user.setCurrentPlan(currentPlan);
            if (totalCredits > 0) user.setTotalCredits(totalCredits);
            user.setUsedCredits(usedCredits);
            return user;
        }
    }

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        String authority = (role == null || role.isEmpty()) ? "USER" : role;
        return List.of(new SimpleGrantedAuthority(authority));
    }


    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }
    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
    public String getDefaultTone() { return defaultTone; }
    public void setDefaultTone(String defaultTone) { this.defaultTone = defaultTone; }
    public String getAiModel() { return aiModel; }
    public void setAiModel(String aiModel) { this.aiModel = aiModel; }
    public String getResponseLength() { return responseLength; }
    public void setResponseLength(String responseLength) { this.responseLength = responseLength; }
    public UserSettings getSettings() { return settings; }
    public void setSettings(UserSettings settings) { this.settings = settings; }
    public boolean isTwoFactorEnabled() { return twoFactorEnabled; }
    public void setTwoFactorEnabled(boolean twoFactorEnabled) { this.twoFactorEnabled = twoFactorEnabled; }
    public String getCurrentPlan() { return currentPlan; }
    public void setCurrentPlan(String currentPlan) { this.currentPlan = currentPlan; }
    public int getTotalCredits() { return totalCredits; }
    public void setTotalCredits(int totalCredits) { this.totalCredits = totalCredits; }
    public int getUsedCredits() { return usedCredits; }
    public void setUsedCredits(int usedCredits) { this.usedCredits = usedCredits; }

}
