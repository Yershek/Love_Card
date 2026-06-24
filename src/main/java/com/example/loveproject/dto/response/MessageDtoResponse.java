package com.example.loveproject.dto.response;

import java.time.LocalDateTime;

public record MessageDtoResponse(
        Long id,
        String text,
        String mood,
        LocalDateTime createdAt
) {
}
