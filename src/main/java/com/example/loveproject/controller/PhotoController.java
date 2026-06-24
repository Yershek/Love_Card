package com.example.loveproject.controller;

import com.example.loveproject.dto.response.PhotoDtoResponse;
import com.example.loveproject.mapper.PhotoMapper;
import com.example.loveproject.service.PhotoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/photos")
@RequiredArgsConstructor
public class PhotoController {
    private final PhotoService photoService;
    public final PhotoMapper photoMapper;

    @GetMapping()
    public ResponseEntity<List<PhotoDtoResponse>> getAll() {
        return ResponseEntity.ok(photoService.getAllPhotos().stream().map(photoMapper::toResponse).toList());
    }

    @PostMapping
    public ResponseEntity<PhotoDtoResponse> upload(@RequestParam("file") MultipartFile file, @RequestParam("caption") String caption) {
        return ResponseEntity.ok(photoMapper.toResponse(photoService.uploadPhoto(file, caption)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        photoService.deletePhoto(id);
        return ResponseEntity.ok().build();
    }
}
