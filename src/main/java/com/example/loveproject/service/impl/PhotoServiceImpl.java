package com.example.loveproject.service.impl;

import com.example.loveproject.entity.PhotoEntity;
import com.example.loveproject.repository.PhotoRepository;
import com.example.loveproject.service.MinIoService;
import com.example.loveproject.service.PhotoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PhotoServiceImpl implements PhotoService {
    private final PhotoRepository photoRepository;
    private final MinIoService minIoService;

    @Value("${minio.bucket-name}")
    private String BucketName;
    @Value("${app.base-url}")
    private String baseUrl;

    @Override
    public List<PhotoEntity> getAllPhotos() {
        return photoRepository.findAll();
    }

    @Override
    public PhotoEntity uploadPhoto(MultipartFile file, String caption) {
        String minioKey = minIoService.upload(BucketName, file);
        PhotoEntity photo = PhotoEntity.builder()
                .url(baseUrl + minioKey)
                .caption(caption)
                .minioKey(minioKey)
                .build();
        return photoRepository.save(photo);
    }

    @Override
    public Void deletePhoto(Long id) {
        PhotoEntity photo = photoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Фото не найдено с id: " + id));
        minIoService.delete(BucketName, photo.getMinioKey());
        photoRepository.delete(photo);
        return null;
    }
}
