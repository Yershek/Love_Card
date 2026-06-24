package com.example.loveproject.service;

import java.util.Map;

public interface MailService {
    void sendHtmlEmail(String to, String subject, String htmlContent, Map<String, Object> variables);
}
