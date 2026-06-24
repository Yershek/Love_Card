package com.example.loveproject.dto.request;

import jakarta.validation.constraints.NotNull;

public record MessageDtoRequest(
        @NotNull
        String text,
        @NotNull
        String mood
) {}
