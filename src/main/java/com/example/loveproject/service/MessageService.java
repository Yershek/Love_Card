package com.example.loveproject.service;

import com.example.loveproject.entity.MessageEntity;

import java.util.List;

public interface MessageService {
    MessageEntity save(MessageEntity entity);
    List<MessageEntity> getAll();
}
