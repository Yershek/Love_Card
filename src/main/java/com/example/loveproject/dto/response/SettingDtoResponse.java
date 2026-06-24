package com.example.loveproject.dto.response;

import java.time.LocalDate;

public record SettingDtoResponse(
        LocalDate startDate,
        String coupleNames
) { }
