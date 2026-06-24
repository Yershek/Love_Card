package com.example.loveproject.controller;

import com.example.loveproject.dto.request.SettingDtoRequest;
import com.example.loveproject.dto.response.SettingDtoResponse;
import com.example.loveproject.mapper.SettingMapper;
import com.example.loveproject.service.SettingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/settings")
@RequiredArgsConstructor
public class SettingController {
    private final SettingMapper settingMapper;
    private final SettingService settingService;

    @PostMapping
    public ResponseEntity<SettingDtoResponse> save(@RequestBody SettingDtoRequest request) {
        return ResponseEntity.ok(settingMapper.toResponse(settingService.save(settingMapper.toEntity(request))));
    }

    @GetMapping
    public ResponseEntity<SettingDtoResponse> get() {
        return ResponseEntity.ok(settingMapper.toResponse(settingService.get()));
    }
}
