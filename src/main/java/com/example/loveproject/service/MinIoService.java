package com.example.loveproject.service;

import org.springframework.web.multipart.MultipartFile;

public interface MinIoService {
    String upload(String bucketName, MultipartFile file);
    void delete(String bucketName, String fileName);
}
