package com.example.loveproject.mapper;

import com.example.loveproject.dto.response.PhotoDtoResponse;
import com.example.loveproject.entity.PhotoEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public abstract class PhotoMapper {

    public abstract PhotoDtoResponse toResponse(PhotoEntity entity);
}
