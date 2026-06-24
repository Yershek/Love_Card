package com.example.loveproject.service.impl;

import com.example.loveproject.entity.SettingEntity;
import com.example.loveproject.repository.SettingRepository;
import com.example.loveproject.service.SettingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SettingServiceImpl implements SettingService {

    private static final Long SETTINGS_ID = 1L;

    private final SettingRepository settingRepository;

    @Override
    public SettingEntity save(SettingEntity request) {
        SettingEntity entity = settingRepository.findById(SETTINGS_ID)
                .orElse(SettingEntity.builder().id(SETTINGS_ID).build());

        entity.setStartDate(request.getStartDate());
        entity.setCoupleNames(request.getCoupleNames());

        return settingRepository.save(entity);
    }

    @Override
    public SettingEntity get() {
        return settingRepository.findById(SETTINGS_ID)
                .orElseThrow(() -> new RuntimeException("Settings not found"));
    }
}
