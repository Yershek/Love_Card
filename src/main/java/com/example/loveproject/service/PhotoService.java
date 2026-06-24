package com.example.loveproject.service;

import com.example.loveproject.dto.response.PhotoDtoResponse;
import com.example.loveproject.entity.PhotoEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PhotoService {
    List<PhotoEntity> getAllPhotos();
    PhotoEntity uploadPhoto(MultipartFile file, String caption);
    Void deletePhoto(Long id);
}
