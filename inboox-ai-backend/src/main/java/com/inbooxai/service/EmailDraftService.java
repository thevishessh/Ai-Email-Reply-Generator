package com.inbooxai.service;

import com.inbooxai.dto.GenerationRequest;
import com.inbooxai.model.EmailDraft;
import com.inbooxai.model.User;
import com.inbooxai.repository.EmailDraftRepository;
import com.inbooxai.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class EmailDraftService {
    private final EmailDraftRepository repository;
    private final UserRepository userRepository;
    private final RestClient restClient;

    public EmailDraftService(
            EmailDraftRepository repository, 
            UserRepository userRepository,
            @Value("${groq.api.key}") String groqApiKey
    ) {
        this.repository = repository;
        this.userRepository = userRepository;
        this.restClient = RestClient.builder()
                .baseUrl("https://api.groq.com/openai/v1/chat/completions")
                .defaultHeader("Authorization", "Bearer " + groqApiKey)
                .build();
    }

    public String generateReply(GenerationRequest request) {
        String prompt = "Generate a " + request.getTone() + " email reply for the following content:\n\n" + request.getEmailContent() + "\n\nReply:";
        
        try {
            Map<String, Object> body = Map.of(
                "model", "llama-3.3-70b-versatile",
                "messages", List.of(
                    Map.of("role", "user", "content", prompt)
                ),
                "temperature", 0.7
            );

            Map<String, Object> response = restClient.post()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(body)
                    .retrieve()
                    .body(Map.class);

            List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
            Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
            String reply = (String) message.get("content");

            saveDraft(request.getEmailContent(), reply, request.getTone());
            return reply;
        } catch (Exception e) {
            e.printStackTrace();
            // Fallback
            String reply = "Thank you for your message. I am currently unavailable but will get back to you soon.";
            saveDraft(request.getEmailContent(), reply, request.getTone());
            return reply;
        }
    }

    private void saveDraft(String original, String generated, String tone) {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !(auth.getPrincipal() instanceof User)) return;
        
        User user = (User) auth.getPrincipal();

        EmailDraft draft = EmailDraft.builder()
                .content(generated)
                .tone(tone)
                .createdAt(LocalDateTime.now())
                .user(user)
                .build();
        
        repository.save(draft);
    }

    public List<EmailDraft> getHistory() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !(auth.getPrincipal() instanceof User)) {
            return List.of();
        }
        User user = (User) auth.getPrincipal();
        return repository.findByUser(user);
    }
}
