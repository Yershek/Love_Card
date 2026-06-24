package com.example.loveproject.dto.request;

import java.time.LocalDate;

public record SettingDtoRequest(
        LocalDate startDate,
        String coupleNames
) { }
