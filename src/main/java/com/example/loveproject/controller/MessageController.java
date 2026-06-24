package com.example.loveproject.controller;

import com.example.loveproject.dto.request.MessageDtoRequest;
import com.example.loveproject.dto.response.MessageDtoResponse;
import com.example.loveproject.mapper.MessageMapper;
import com.example.loveproject.service.MessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
public class MessageController {
    private final MessageService messageService;
    private final MessageMapper messageMapper;

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<MessageDtoResponse> send(@Valid @RequestBody MessageDtoRequest request) {
        return ResponseEntity.ok(messageMapper.toResponse(messageService.save(messageMapper.toEntity(request))));
    }

    @GetMapping()
    public ResponseEntity<List<MessageDtoResponse>> getAll() {
        return ResponseEntity.ok(messageService.getAll().stream().map(messageMapper::toResponse).toList());
    }
}
