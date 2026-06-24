package com.example.loveproject.service;

import com.example.loveproject.entity.SettingEntity;

public interface SettingService {
    SettingEntity save(SettingEntity request);
    SettingEntity get();
}
