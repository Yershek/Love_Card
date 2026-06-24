package com.example.loveproject.dto.response;

import java.time.LocalDateTime;

public record PhotoDtoResponse(
        Long id,
        String url,
        String caption,
        LocalDateTime createdAt
) {
}
