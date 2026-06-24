package com.example.loveproject.service.impl;

import com.example.loveproject.entity.MessageEntity;
import com.example.loveproject.repository.MessageRepository;
import com.example.loveproject.service.MailService;
import com.example.loveproject.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;
    private final MailService mailService;

    @Value("${mail.recipient}")
    private String recipient;

    @Override
    public MessageEntity save(MessageEntity entity) {
        entity.setCreatedAt(LocalDateTime.now());
        MessageEntity saved = messageRepository.save(entity);
        mailService.sendHtmlEmail(
                recipient,
                "Новое сообщение",
                "message",
                Map.of("text", saved.getText(), "mood", saved.getMood(), "createdAt", saved.getCreatedAt())
        );
        return saved;
    }

    @Override
    public List<MessageEntity> getAll() {
        return messageRepository.findAll();
    }
}
